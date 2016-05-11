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

  getPreviousMonthUrl () {
    let { month, year } = this.props

    let prevMonth = month > 1 ? month - 1 : 12
    let prevYear = month > 1 ? year : year - 1

    return `/${prevYear}/${prevMonth}`
  }

  getNextMonthUrl () {
    let { month, year } = this.props

    let nextMonth = month < 12 ? month + 1 : 1
    let nextYear = month < 12 ? year : year + 1

    return `/${nextYear}/${nextMonth}`
  }

  render () {
    let { month, year } = this.props

    const _month = (month - 1)

    const title = moment(new Date(year, _month)).format('MMMM')

    const prev = this.getPreviousMonthUrl()
    const next = this.getNextMonthUrl()

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
