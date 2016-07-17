import fetch from 'isomorphic-fetch'
import Promise from 'bluebird'
import moment from 'moment'
import _ from 'lodash'
import Prompt from '../models/prompt'
import User from '../models/user'
import { fetchEntryByDate } from './entries'

const VERIFY_TOKEN = process.env.VERIFY_TOKEN
const PAGE_TOKEN = process.env.PAGE_TOKEN
const MESSAGES_PATH = 'https://graph.facebook.com/v2.6/me/messages'

// TODO: move to separate file
class MessageParser {
  constructor() {
    this.dateId = moment().format('YYYYMMDD')

    this.entry = null
    this.user = null
    this.item = null

    this.questions = {
      entry: [],
      conversation: []
    }
  }

  onReceive(id, text) {
    return this.fetchUser(id)
      .then(user => this.fetchEntry(id))
      .then(entry => this.findPendingItem())
      .then(item => this.validateText(text, item.type))
      .then(text => this.saveToPendingItem(text))
      .then(() => this.findNextItem())
      .then(item => this.sendReply(id, item.question))
      .catch(err => this.sendReply(id, err.message))
  }

  fetchUser(facebookId) {
    return User.findOne({ facebookId })
      .then(user => {
        const convo = user && user.conversation
        const _dateId = convo && convo.dateId

        console.log(_dateId, this.dateId)

        if (_dateId === this.dateId) {
          this.questions.conversation = convo.questions

          return user
        } else {
          user.conversation = {
            dateId: this.dateId,
            questions: this.questions.conversation
          }

          return user.save()
        }
      })
      .then(user => {
        this.user = user

        return this.user
      })
  }

  fetchEntry() {
    return fetchEntryByDate(this.dateId)
      .then(entry => {
        const { prompts, goals } = entry

        this.entry = entry
        this.questions.entry = goals
          .map(goal => {
            return {
              question: goal.text,
              type: 'goal'
            }
          })
          .concat(prompts.map(prompt => {
            return {
              question: prompt.question,
              type: 'prompt'
            }
          }))
          .sort(question => question.type)

        return this.entry
      })
  }

  findPendingItem() {
    const { user, entry } = this
    const { questions } = user.conversation;

    this.item = questions.find(q => q.pending) || { type: 'none' };

    return this.item
  }

  validateText(text, type) {
    if (type === 'none') return ''

    if (type === 'prompt') {
      if (isValidPromptResponse(text)) {
        return text
      } else {
        throw new Error(`Invalid text ${text} for type ${type}`)
      }
    } else if (type === 'goal') {
      if (isValidGoalResponse(text)) {
        return text
      } else {
        throw new Error(`Invalid text ${text} for type ${type}`)
      }
    } else {
      throw new Error(`Invalid type ${type}`)
    }
  }

  typeMap(type) {
    const map = {
      prompt: {
        list: 'prompts',
        field: 'answer',
        questionField: 'question',
        parser: parseResponse
      },
      goal: {
        list: 'goals',
        field: 'finished',
        questionField: 'text',
        parser: parseBool
      }
    }

    const result = map[type || this.item.type]

    if (!result) throw new Error(`Invalid type ${this.item.type}`)

    return result
  }

  saveToPendingItem(text) {
    if (!text || !text.length) return null

    const { list, field, questionField, parser } = this.typeMap()
    const { question } = this.item

    this.entry[list] = this.entry[list].map(item => {
      if (question === item[questionField]) {
        item[field] = parser(text)
      }

      return item
    })

    return this.entry.save()
  }

  findNextItem(options) {
    const { user } = this;

    const _next = this.questions.entry[user.conversation.questions.length]

    if (!_next) throw new Error('You are done!')

    const nextQuestion = Object.assign({}, _next, { pending: true })

    user.conversation.questions = user.conversation.questions
      .map(question => {
        return Object.assign(question, { pending: false })
      })
      .concat(nextQuestion) // TODO: fix this to not add at end

    return user.save()
      .then(u => {
        return nextQuestion
      })
  }

  sendReply(id, text) {
    console.log(JSON.stringify(this.user.conversation, null, 2))
    return sendMessage(id, text);
  }
}



export function verify (req, res) {
  console.log('Request query:', req.query)
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
    return;
  }

  res.send('oops!');
}

export function listen (req, res) {
  const events = req.body.entry[0].messaging

  console.log('EVENTS!', events)

  let promises = events
    .filter(e => {
      return (e.sender && e.sender.id) && (e.message && e.message.text)
    })
    .map(e => {
      const parser = new MessageParser()

      return parser.onReceive(e.sender.id, e.message.text)
    })

  Promise.all(promises)
    .then((results) => {
      console.log('PROMISE RESULTS!', results)
      res.sendStatus(200)
    })
    .catch(err => {
      console.log('ERROR!', err);
      res.sendStatus(500);
    })
}

function isValidGoalResponse(text) {
  return _.includes(['YES', 'Y', 'NO', 'N'], String(text).toUpperCase())
}

function parseBool(text) {
  if (_.includes(['YES', 'Y'], text.toUpperCase())) {
    return true
  } else if (_.includes(['NO', 'N'], text.toUpperCase())) {
    return false
  } else {
    return null
  }
}

function isValidPromptResponse(text) {
  return String(text) && String(text).length;
}

function parseResponse(text) {
  if (text.toUpperCase() === 'SKIP') {
    return ''
  } else {
    return text
  }
}

function sendMessage(id, text) {
  const message = {
    recipient: { id },
    message: { text }
  }

  const json = JSON.stringify(message);

  console.log('Attempting to send message:', message)
  console.log('To path: ', `${MESSAGES_PATH}?access_token=${PAGE_TOKEN}`)

  return fetch(`${MESSAGES_PATH}?access_token=${PAGE_TOKEN}`, {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
    },
    body: json
  });
}

