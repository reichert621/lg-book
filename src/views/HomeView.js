import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { fetchEntries } from '../redux/modules/entries'
import Calendar from './CalendarView.js'
import NavBar from './NavBar.js'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  entries: state.entries.items
})

export class HomeView extends React.Component {
  static propTypes = {
    fetchEntries: React.PropTypes.func.isRequired,
    params: React.PropTypes.object
  }

  componentDidMount () {
    this.props.fetchEntries()
  }

  render () {
    const year = Number(this.props.params.year) || (new Date()).getFullYear()
    const month = Number(this.props.params.month) || (new Date()).getMonth() + 1

    return (
      <div>
        <NavBar />
        <div>
          <div className='text-center'>
            <h1>Daily Journal</h1>
          </div>

          <Calendar
            year={year}
            month={month} />

          <hr />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchEntries })(HomeView)
