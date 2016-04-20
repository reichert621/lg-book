import Entry from '../models/entry.js'
import Prompt from '../models/prompt.js'
import Goal from '../models/goal.js'
import moment from 'moment'

function fetchDefaultPrompts() {
  return Prompt.find()
    .then(prompts => {
      return prompts
        .filter(p => p.active)
        .map(p => {
          return { question: p.text, answer: '' }
        })
    })
}

function fetchDefaultGoals() {
  return Goal.find()
    .then(goals => {
      return goals.map(g => {
        return { text: g.text, finished: false }
      })
    })
}

function createDefaultEntry(entryDateId, cb) {
  const _date = new Date([
    entryDateId.slice(0,4), entryDateId.slice(4,6), entryDateId.slice(6,8)
  ].join('-'))

  let _entry = {
    text: '',
    title: 'New Entry',
    date: entryDateId,
    _date: _date,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  return fetchDefaultPrompts()
    .then(prompts => {
      _entry.prompts = prompts

      return fetchDefaultGoals()
    })
    .then(goals => {
      _entry.goals = goals

      return Entry.create(_entry)
    })
    .catch(err => console.log(err))

}

export function list (req, res) {
  Entry.find()
    .then(entries => res.json({ entries }))
    .catch(err => console.log('Error in method Entry#list', err))

}

export function show (req, res) {
  const entryDateId = req.params.dateId

  Entry.findOne({ date: entryDateId })
    .then(entry => {
      if (entry) return entry

      return createDefaultEntry(entryDateId)
    })
    .then(entry => res.json({ entry }))
    .catch(err => console.log('Error in method Entry#show', err))

}

export function update (req, res) {
  const entryId = req.params.id
  const entryParams = req.body

  Entry.findById(entryId)
    .then(entry => {
      Object.assign(entry, entryParams, { updatedAt: new Date() })

      return entry.save()
    })
    .then(entry => res.json({ entry }))
    .catch(err => {
      console.log('Error in method Entry#update', err)

      return res.status(500).json({ error: err.message })
    })

}
