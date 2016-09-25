import React from 'react'
import classes from './Calendar.scss'
import moment from 'moment'
import { Link } from 'react-router'

const styles = {
  title: {
    letterSpacing: 1
  },
  header: {
    marginTop: 10,
    marginBottom: 24
  },
  switchMonth: {
    paddingTop: 15
  }
}

function getPreviousMonthUrl (month, year) {
  let prevMonth = month > 1 ? month - 1 : 12
  let prevYear = month > 1 ? year : year - 1

  return `/${prevYear}/${prevMonth}`
}

function getNextMonthUrl (month, year) {
  let nextMonth = month < 12 ? month + 1 : 1
  let nextYear = month < 12 ? year : year + 1

  return `/${nextYear}/${nextMonth}`
}

const CalendarHeader = ({ month, year }) => {
  const title = moment(new Date(year, month - 1)).format('MMMM')

  return (
    <div className='row' style={styles.header}>
      <div className='col-sm-2 text-center' style={styles.switchMonth}>
        <Link to={getPreviousMonthUrl(month, year)}>
          <span className='glyphicon glyphicon-menu-left' aria-hidden='true'></span>
        </Link>
      </div>
      <div className='col-sm-8'>
        <div className={classes['calendar-header']} style={styles.title}>
          {title} {year}
        </div>
      </div>
      <div className='col-sm-2 text-center' style={styles.switchMonth}>
        <Link to={getNextMonthUrl(month, year)}>
          <span className='glyphicon glyphicon-menu-right' aria-hidden='true'></span>
        </Link>
      </div>
    </div>
  )
}

CalendarHeader.propTypes = {
  year: React.PropTypes.number.isRequired,
  month: React.PropTypes.number.isRequired
}

export default CalendarHeader

