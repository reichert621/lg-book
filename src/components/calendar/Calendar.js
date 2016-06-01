import React from 'react'
import moment from 'moment'
import classes from './Calendar.scss'
import CalendarHeader from './CalendarHeader.js'
import CalendarDay from './CalendarDay.js'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// TODO: move to container component?
const generateWeeks = (month, year) => {
  let weeks = []

  let _current = new Date(year, month, 1)
  const offset = _current.getDay() - 1

  while (_current.getMonth() === month) {
    let dayIndex = _current.getDay()
    let _month = _current.getMonth()
    let _date = _current.getDate()
    let weekIndex = Math.floor((_date + offset) / 7)

    weeks[weekIndex] = weeks[weekIndex] || []
    weeks[weekIndex][dayIndex] = {
      day: _date,
      month: _month,
      date: _current
    }

    _current = new Date(year, month, _date + 1)
  }

  // Ensure each week row includes 7 elements
  for (let i = 0; i < weeks.length; i++) {
    let _week = weeks[i]

    for (let j = 0; j < 7; j++) {
      _week[j] = _week[j] || {}
    }
  }

  return weeks
}

const Calendar = ({ month, year, entries }) => {
  const _month = month - 1
  const weeks = generateWeeks(_month, year)

  let weekRows = weeks.map((week, key) => {
    return (
      <tr key={key}>
        {
          week.map((date, _key) => {
            date.dateId = moment(date.date).format('YYYYMMDD')

            let entry = entries[date.dateId]
            let isDisabled = (moment().diff(moment(date.date)) < 0)

            return (
              <CalendarDay
                key={_key}
                entry={entry}
                date={date}
                month={month}
                year={year}
                isDisabled={isDisabled} />
            )
          })
        }
      </tr>
    )
  })

  let columns = DAYS.map((day, key) => {
    return (
      <th key={key} className={classes['calendar-day-label']}>
        {day}
      </th>
    )
  })

  return (
    <div className={classes['calendar-container']}>
      <CalendarHeader
        month={month}
        year={year}/>

      <table className={classes['calendar-table']}>
        <tbody>
          <tr>{columns}</tr>

          {weekRows}

        </tbody>
      </table>

    </div>
  )
}

Calendar.propTypes = {
  year: React.PropTypes.number.isRequired,
  month: React.PropTypes.number.isRequired,
  weeks: React.PropTypes.array
}

export default Calendar
