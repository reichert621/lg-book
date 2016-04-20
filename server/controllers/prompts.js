import Prompt from '../models/prompt.js'
import _ from 'lodash'

export function list (req, res) {
  Prompt.find((err, prompts) => {
    if (err) console.log(err)

    res.json({
      prompts: prompts
    })
  })
}

export function create (req, res) {
  const promptParams = req.body

  Prompt.create(promptParams, (err, prompt) => {
    if (err) return console.log('Error in method Prompt#create', err)

    res.json({
      prompt: prompt
    })
  })
}

export function update (req, res) {
  const promptId = req.params.id
  const promptParams = req.body

  Prompt.findById(promptId, (err, prompt) => {
    if (err) return console.log('Error in method Prompt#update', err)

    _.extend(prompt, promptParams)

    prompt.save(() => {
      res.json({
        prompt: prompt
      })
    })
  })
}

export function destroy (req, res) {
  const promptId = req.params.id

  Prompt.findById(promptId, (err, prompt) => {
    if (err) return console.log('Error in method Prompt#destroy', err)

    prompt.remove(() => {
      res.json({
        prompt: prompt
      })
    })
  })
}
