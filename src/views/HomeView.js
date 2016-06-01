import React from 'react'
import { connect } from 'react-redux'
import { fetchEntries } from '../redux/modules/entries'
import Calendar from '../components/calendar'
import NavBar from '../components/navbar'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  entries: state.entries.items
})

const parseEntries = (entries) => {
  return entries.reduce((result, entry) => {
    if (entry.date) {
      result[entry.date] = entry
    }

    return result
  }, {})
}

export class HomeView extends React.Component {
  static propTypes = {
    fetchEntries: React.PropTypes.func.isRequired,
    entries: React.PropTypes.array,
    params: React.PropTypes.object
  }

  componentDidMount () {
    this.props.fetchEntries()
  }

  render () {
    const { entries, params } = this.props
    let { year, month } = params

    const _year = Number(year) || (new Date()).getFullYear()
    const _month = Number(month) || (new Date()).getMonth() + 1
    const _entries = parseEntries(entries)

    return (
      <div>
        <NavBar />

        <Calendar
          year={_year}
          month={_month}
          entries={_entries} />
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchEntries })(HomeView)
