import React from 'react'
import AddItem from './AddItem.js'
import Goal from './Goal.js'

export class EntryGoals extends React.Component {
  toggleGoal (goal) {
    const { goals, handleUpdate } = this.props

    const params = {
      goals: goals.map(g => {
        if (g.text === goal.text) {
          g.finished = !g.finished
        }

        return g
      })
    }

    handleUpdate(params)
  }

  addGoal (text) {
    if (!text) return

    const { goals, handleUpdate } = this.props
    const _goal = { text, finished: false }
    const params = { goals: goals.concat(_goal) }

    handleUpdate(params)
  }

  render () {
    const { goals } = this.props

    return (
      <div>
        <div>
          {
            goals.map(g =>
              <Goal
                key={g._id}
                goal={g}
                handleToggle={this.toggleGoal.bind(this, g)} />
            )
          }
        </div>

        <AddItem
          placeholder='Enter new goal...'
          addItem={this.addGoal.bind(this)} />

      </div>
    )
  }
}

EntryGoals.propTypes = {
  goals: React.PropTypes.array,
  handleUpdate: React.PropTypes.func.isRequired
}

export default EntryGoals
