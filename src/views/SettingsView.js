import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { actions as promptActions } from '../redux/modules/prompts'
import { actions as goalActions } from '../redux/modules/goals'
import EditableList from './EditableList.js'

const allActions = Object.assign({}, promptActions, goalActions)

const mapStateToProps = (state) => ({
  prompts: state.prompts.items,
  goals: state.goals.items,
  fetching: state.goals.isFetching
})

export class SettingsView extends React.Component {
  static propTypes = {
    prompts: React.PropTypes.array,
    goals: React.PropTypes.array,
    fetchPrompts: React.PropTypes.func.isRequired,
    fetchGoals: React.PropTypes.func.isRequired,
    updatePrompt: React.PropTypes.func.isRequired,
    updateGoal: React.PropTypes.func.isRequired,
    removePrompt: React.PropTypes.func.isRequired,
    removeGoal: React.PropTypes.func.isRequired,
    addPrompt: React.PropTypes.func.isRequired,
    addGoal: React.PropTypes.func.isRequired,
    fetching: React.PropTypes.bool
  }

  componentDidMount () {
    this.props.fetchPrompts()
    this.props.fetchGoals()
  }

  render () {
    if (this.props.fetching) {
      return (
        <div className='container text-center'>
          <h1>Loading...</h1>
        </div>
      )
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <EditableList title='Prompts'
                items={this.props.prompts}
                addItem={this.props.addPrompt}
                updateItem={this.props.updatePrompt}
                removeItem={this.props.removePrompt} />
          </div>
          <div className='col-md-6'>
            <EditableList title='Goals'
                items={this.props.goals}
                addItem={this.props.addGoal}
                updateItem={this.props.updateGoal}
                removeItem={this.props.removeGoal} />
          </div>
          <div className='col-md-12'>
            <Link to='/'>Back To Home View</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsView
export default connect(mapStateToProps, allActions)(SettingsView)
