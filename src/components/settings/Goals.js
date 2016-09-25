import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/goals'
import NewItemInput from '../forms/NewItemInput'
import Goal from './Goal'

const mapStateToProps = (state) => ({
  goals: state.goals.items,
  fetching: state.goals.isFetching
})

export class GoalSettings extends React.Component {
  componentDidMount () {
    this.props.fetchGoals()
  }

  render () {
    const { goals, removeGoal, updateGoal, addGoal } = this.props

    let _goals = goals.map((goal, index) => {
      return (
        <Goal
          key={index}
          goal={goal}
          onRemove={removeGoal.bind(this, goal._id)}
          onUpdate={updateGoal.bind(this, goal._id)} />
      )
    })

    return (
      <div>
        <h1 className='text-center' style={STYLES.title}>
          Goals
        </h1>

        <NewItemInput
          onSubmit={addGoal.bind(this)} />

        <div>
          {_goals}
        </div>

      </div>
    )
  }
}

GoalSettings.propTypes = {
  goals: React.PropTypes.array,
  fetchGoals: React.PropTypes.func.isRequired,
  updateGoal: React.PropTypes.func.isRequired,
  removeGoal: React.PropTypes.func.isRequired,
  addGoal: React.PropTypes.func.isRequired,
  fetching: React.PropTypes.bool
}

const STYLES = {
  title: { marginBottom: 0 },
  noItems: { fontSize: 16 }
}

export default connect(mapStateToProps, actions)(GoalSettings)
