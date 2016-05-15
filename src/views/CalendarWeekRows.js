import React from 'react'
import styles from './CalendarView.scss'
import CalendarDay from './CalendarDay.js'

export class CalendarWeekRows extends React.Component {
  static propTypes = {
    month: React.PropTypes.number,
    year: React.PropTypes.number
  }

  render () {
    let weeks = []

    const { month, year } = this.props

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

    for (let i = 0; i < weeks.length; i++) {
      let _week = weeks[i]

      for (let j = 0; j < 7; j++) {
        _week[j] = _week[j] || {}
      }
    }

    let weekRows = weeks.map((week, i) => {
      let _row = week.map((date, j) => {
        return (
          <CalendarDay key={j}
            year={year}
            month={month}
            date={date} />
        )
      })

      return (
        <tr key={i}>{_row}</tr>
      )
    })

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let columns = days.map((day, i) => {
      return (
        <th key={i} className={styles['calendar-day-label']}>{day}</th>
      )
    })

    let columnRow = <tr>{columns}</tr>

    return (
      <table className={styles['calendar-table']}>
        <tbody>
          {columnRow}
          {weekRows}
        </tbody>
      </table>
    )
  }
}

export default CalendarWeekRows
