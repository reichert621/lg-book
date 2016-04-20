import React from 'react'
import styles from './CalendarView.scss'
import CalendarWeekRows from './CalendarWeekRows.js'
import moment from 'moment'
import { Link } from 'react-router'

export class CalendarView extends React.Component {
  static propTypes = {
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired
  }

  render () {
    let { month, year } = this.props

    const _month = (month - 1)

    const title = moment(new Date(year, _month)).format('MMMM')

    let _prevMonth = month - 1
    let _nextMonth = month + 1
    let _prevYear = year
    let _nextYear = year

    if (_prevMonth < 1) {
      _prevMonth = 12
      _prevYear--
    }

    if (_nextMonth > 12) {
      _nextMonth = 1
      _nextYear++
    }

    const prev = `/${_prevYear}/${_prevMonth}`
    const next = `/${_nextYear}/${_nextMonth}`

    let titleStyle = {
      letterSpacing: 1
    }

    return (
      <div className={styles['calendar-container']}>
        <div className='row'>
          <div className='col-md-6 text-left'>
            <Link to={prev}>Prev</Link>
          </div>
          <div className='col-md-6 text-right'>
            <Link to={next}>Next</Link>
          </div>
        </div>
        <div className={styles['calendar-header']} style={titleStyle}>{title}</div>
        <CalendarWeekRows
          month={_month}
          year={year} />
      </div>
    )
  }
}

export default CalendarView
