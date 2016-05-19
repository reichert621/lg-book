import fetch from 'isomorphic-fetch'
import Promise from 'bluebird'
import moment from 'moment'
import Prompt from '../models/prompt'
import { fetchEntryByDate } from './entries'

const VERIFY_TOKEN = process.env.VERIFY_TOKEN
const PAGE_TOKEN = process.env.PAGE_TOKEN
const MESSAGES_PATH = 'https://graph.facebook.com/v2.6/me/messages'

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
      return handleMessage(e.sender.id, e.message.text)
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

function handleMessage(id, text) {
  const dateId = moment().format('YYYYMMDD')

  return fetchEntryByDate(dateId)
    .then(entry => {
      let goals = entry.goals || []
      let randomGoal = goals[Math.floor(goals.length * Math.random())]
      let _text = `Did you ${randomGoal.text.toLowerCase()}?`

      console.log(`Replacing ${text} with ${_text}`)
      return sendMessage(id, _text)
    })
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

