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

    const style = {
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

    return (
      <div className={styles['calendar-container']}>

        <div className='row' style={style.header}>
          <div className='col-sm-2 text-center' style={style.switchMonth}>
            <Link to={prev}>
              <span className='glyphicon glyphicon-menu-left' aria-hidden='true'></span>
            </Link>
          </div>
          <div className='col-sm-8'>
            <div className={styles['calendar-header']} style={style.title}>
              {title} {year}
            </div>
          </div>
          <div className='col-sm-2 text-center' style={style.switchMonth}>
            <Link to={next}>
              <span className='glyphicon glyphicon-menu-right' aria-hidden='true'></span>
            </Link>
          </div>
        </div>

        <CalendarWeekRows
          month={_month}
          year={year} />
      </div>
    )
  }
}

export default CalendarView
