import Goal from '../models/goal.js'
import _ from 'lodash'

export function list (req, res) {
  Goal.find((err, goals) => {
    if (err) console.log(err)

    res.json({
      goals: goals
    })
  })
}

export function create (req, res) {
  const goalParams = req.body

  Goal.create(goalParams, (err, goal) => {
    if (err) return console.log('Error in method Goal#create', err)

    res.json({
      goal: goal
    })
  })
}

export function update (req, res) {
  const goalId = req.params.id
  const goalParams = req.body

  Goal.findById(goalId, (err, goal) => {
    if (err) return console.log('Error in method Goal#update', err)

    _.extend(goal, goalParams)

    goal.save(() => {
      res.json({
        goal: goal
      })
    })
  })
}

export function destroy (req, res) {
  const goalId = req.params.id

  Goal.findById(goalId, (err, goal) => {
    if (err) return console.log('Error in method Goal#destroy', err)

    goal.remove(() => {
      res.json({
        goal: goal
      })
    })
  })
}
