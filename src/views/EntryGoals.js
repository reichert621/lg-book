import React from 'react'
import styles from './EntryView.scss'

export class EntryGoals extends React.Component {
  static propTypes = {
    goals: React.PropTypes.array,
    handleUpdate: React.PropTypes.func.isRequired
  }

  toggleGoal (goal) {
    let params = {
      goals: this.props.goals.map((item) => {
        if (item.text === goal.text) {
          item.finished = !item.finished
        }

        return item
      })
    }

    this.props.handleUpdate(params)
  }

  addGoal () {
    if (!this.refs.newGoal.value || !this.refs.newGoal.value.length) {
      return
    }

    const newGoal = {
      text: this.refs.newGoal.value, finished: false
    }

    let params = {
      goals: this.props.goals.concat(newGoal)
    }

    this.props.handleUpdate(params)
    this.refs.newGoal.value = ''
  }

  handleSubmitNew (e) {
    if (e.which === 13) {
      this.addGoal()
    }
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

        <div className={styles['input-add-item']}>
          <input type='text' className='form-control' ref='newGoal'
              placeholder='Enter new goal...'
              onKeyDown={this.handleSubmitNew.bind(this)} />
          <button className='btn'
              onClick={this.addGoal.bind(this)}>
            Add
          </button>
        </div>
      </div>
    )
  }
}

export default EntryGoals
