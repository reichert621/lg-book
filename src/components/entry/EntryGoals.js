import React from 'react'
import styles from './Entry.scss'
import AddItem from './AddItem.js'

export class EntryGoals extends React.Component {
  static propTypes = {
    goals: React.PropTypes.array,
    handleUpdate: React.PropTypes.func.isRequired
  }

  toggleGoal (goal) {
    let params = {
      goals: this.props.goals.map(item => {
        if (item.text === goal.text) {
          item.finished = !item.finished
        }

        return item
      })
    }

    this.props.handleUpdate(params)
  }

  addGoal (text) {
    if (!text) return

    const { goals, handleUpdate } = this.props
    const _goal = { text, finished: false }
    const params = { goals: goals.concat(_goal) }

    handleUpdate(params)
  }

  render () {
    let goals = this.props.goals.map((item) => {
      let itemStyle = {
        textDecoration: item.finished ? 'line-through' : 'none'
      }

      return (
        <div key={item._id} style={itemStyle}
          className={styles['list-item-goal']}
          onClick={this.toggleGoal.bind(this, item)}>
          {item.text}
        </div>
      )
    })

    return (
      <div>
        <div>{goals}</div>

        <AddItem
          placeholder='Enter new goal...'
          addItem={this.addGoal.bind(this)} />

      </div>
    )
  }
}

export default EntryGoals
