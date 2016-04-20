import React from 'react'
import styles from './CalendarView.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import moment from 'moment'

const mapStateToProps = (state) => ({
  entries: state.entries.items
})

export class CalendarDay extends React.Component {
  static propTypes = {
    entries: React.PropTypes.array,
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    date: React.PropTypes.object
  }

  render () {
    const { date, entries, year, month } = this.props

    if (date && date.day) {
      let finishedGoals = []
      let formatted = moment(date.date).format('YYYYMMDD')

      if (entries && entries.length) {
        let currentEntry = entries.find((e) => e.date === formatted)

        if (currentEntry) {
          let { goals } = currentEntry
          finishedGoals = goals.filter((g) => g.finished)
        }
      }

      let progressClass

      if (finishedGoals.length) {
        progressClass = classNames(styles['progress-bar'], styles['filled'])
      } else {
        progressClass = styles['progress-bar']
      }

      return (
        <td key={date.day} className={styles['calendar-day']}>
          <Link to={`/${year}/${month + 1}/${date.day}`} className={styles['outer-container']}>
            <div className={styles['inner-container']}>
              {date.day}
            </div>
            <div className={progressClass}></div>
          </Link>
        </td>
      )
    } else {
      let cellClass = classNames(styles['calendar-day'], styles['disabled'])

      return (
        <td className={cellClass}>{' '}</td>
      )
    }
  }
}

export default connect(mapStateToProps)(CalendarDay)
