import React from 'react'
import moment from 'moment'
import { browserHistory } from 'react-router'
import styles from './Calendar.scss'
import classNames from 'classnames'

const badgeStyle = {
  '-1': styles['disabled'],
  '0': styles['none'],
  '1': styles['low'],
  '2': styles['med'],
  '3': styles['high'],
  '4': styles['extreme'],
  '5': styles['all']
}

const getBadgeStyle = (entry, isDisabled) => {
  if (isDisabled) return badgeStyle['-1']

  let ratio = 1

  if (entry && entry.goals) {
    let unfinishedGoals = entry.goals.filter((g) => !g.finished)

    ratio = (unfinishedGoals.length / entry.goals.length)
  }

  return badgeStyle[Math.floor(ratio * 5)]
}

const goToEntry = (date) => {
  const [year, month, day] = moment(date).format('YYYY-MM-DD').split('-')

  browserHistory.push(`/${year}/${month}/${day}`)
}

const CalendarDay = ({
  month, year, date, entry, isDisabled, onClick
}) => {
  if (date.day) {
    let _badgeStyle = getBadgeStyle(entry, isDisabled)

    return (
      <td key={date.day}
          className={classNames(styles['calendar-day'], _badgeStyle)}
          onClick={!isDisabled && goToEntry.bind(null, date.date)}>
        <span>
          {date.day}
        </span>
        <div className={styles['badge-icon']}></div>
      </td>
    )
  } else {
    return (
      <td className={classNames(styles['calendar-day'], styles['disabled'])}>
        {' '}
      </td>
    )
  }
}

CalendarDay.propTypes = {
  year: React.PropTypes.number.isRequired,
  month: React.PropTypes.number.isRequired,
  date: React.PropTypes.object.isRequired,
  entry: React.PropTypes.object,
  isDisabled: React.PropTypes.bool,
  onClick: React.PropTypes.func
}

export default CalendarDay
