import React from 'react'
import styles from './CalendarView.scss'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
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

  handleClick (badgeNum) {
    if (badgeNum < 0) return

    const { date, year, month } = this.props

    browserHistory.push(`/${year}/${month + 1}/${date.day}`)
  }

  render () {
    const badgeStyle = {
      '-1': styles['disabled'],
      0: styles['none'],
      1: styles['low'],
      2: styles['med'],
      3: styles['high'],
      4: styles['extreme'],
      5: styles['all']
    }

    const { date, entries } = this.props

    if (date && date.day) {
      let formatted = moment(date.date).format('YYYYMMDD')
      let dayDiff = moment().diff(moment(date.date))
      let badgeNum

      if (dayDiff < 0) {
        badgeNum = -1
      } else {
        if (entries && entries.length) {
          let currentEntry = entries.find((e) => e.date === formatted)
          let ratio = 1

          if (currentEntry) {
            let { goals } = currentEntry
            let unfinishedGoals = goals.filter((g) => !g.finished)
            ratio = unfinishedGoals.length / goals.length
          }

          badgeNum = Math.floor(ratio * 5)
        }
      }

      let dayClass = classNames(styles['calendar-day'], badgeStyle[badgeNum])

      return (
        <td key={date.day} className={dayClass} onClick={this.handleClick.bind(this, badgeNum)}>
          <span>
            {date.day}
          </span>
          <div className={styles['badge-icon']}></div>
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
