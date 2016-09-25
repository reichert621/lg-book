import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/entries'
import EntryPrompts from './EntryPrompts.js'
import EntryGoals from './EntryGoals.js'

const mapStateToProps = (state) => ({
  entry: state.entries.item,
  fetching: state.entries.isFetching
})

export class Entry extends React.Component {
  componentDidMount () {
    const { params, fetchEntry } = this.props
    const { year, month, day } = params

    const monthIndex = Number(month) - 1
    const dateId = moment(new Date(year, monthIndex, day)).format('YYYYMMDD')

    fetchEntry(dateId)
  }

  render () {
    const { entry, updateEntry, editEntry } = this.props

    if (!entry) {
      return (
        <div className='container text-center'>
          <h1 style={STYLES.loading}>Loading...</h1>
        </div>
      )
    }

    const { _id, title, prompts, goals } = entry

    return (
      <div className='container text-center' style={STYLES.container}>
        <Link to='/'>Back To Home View</Link>

        <hr />

        <h1>{title}</h1>

        <div className='row'>
          <div className='col-md-6 col-md-offset-3'>
            <EntryGoals
              goals={goals}
              handleUpdate={updateEntry.bind(this, _id)} />
          </div>

          <div className='col-md-6 col-md-offset-3'>
            <EntryPrompts
              prompts={prompts}
              entry={entry}
              handleUpdate={updateEntry.bind(this, _id)}
              handleEdit={editEntry} />
          </div>
        </div>

        <hr />

        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

Entry.propTypes = {
  entry: React.PropTypes.object,
  fetchEntry: React.PropTypes.func.isRequired,
  updateEntry: React.PropTypes.func.isRequired,
  editEntry: React.PropTypes.func.isRequired,
  params: React.PropTypes.object,
  fetching: React.PropTypes.bool
}

const STYLES = {
  container: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white'
  },
  loading: {
    marginTop: 100
  }
}

export default connect(mapStateToProps, actions)(Entry)
