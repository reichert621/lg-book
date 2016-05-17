import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchEntry, updateEntry, editEntry } from '../redux/modules/entries'
import EntryPrompts from './EntryPrompts.js'
import EntryGoals from './EntryGoals.js'

const mapStateToProps = (state) => ({
  entry: state.entries.item,
  fetching: state.entries.isFetching
})

export class EntryView extends React.Component {
  static propTypes = {
    entry: React.PropTypes.object,
    fetchEntry: React.PropTypes.func.isRequired,
    updateEntry: React.PropTypes.func.isRequired,
    editEntry: React.PropTypes.func.isRequired,
    params: React.PropTypes.object,
    fetching: React.PropTypes.bool
  }

  componentDidMount () {
    const { year, month, day } = this.props.params
    const monthIndex = Number(month) - 1
    const dateId = moment(new Date(year, monthIndex, day)).format('YYYYMMDD')

    this.props.fetchEntry(dateId)
  }

  render () {
    const style = {
      container: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: 'white'
      },
      loading: {
        marginTop: 100
      }
    }

    // if (this.props.fetching || !this.props.entry) {
    //   return (
    //     <div className='container text-center'>
    //       <h1 style={style.loading}>Loading...</h1>
    //     </div>
    //   )
    // }

    let { _id, title, prompts, goals } = this.props.entry

    return (
      <div className='container text-center' style={style.container}>
        <Link to='/'>Back To Home View</Link>
        <hr />
        <h1>{title}</h1>
        <div className='row'>
          <div className='col-md-6 col-md-offset-3'>
            <EntryGoals
              goals={goals}
              handleUpdate={this.props.updateEntry.bind(this, _id)} />
          </div>

          <div className='col-md-6 col-md-offset-3'>
            <EntryPrompts
              prompts={prompts}
              entry={this.props.entry}
              handleUpdate={this.props.updateEntry.bind(this, _id)}
              handleEdit={this.props.editEntry} />
          </div>
        </div>
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { fetchEntry, updateEntry, editEntry }
)(EntryView)
