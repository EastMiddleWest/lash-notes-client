import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import styles from './Calendar.module.scss'
import Tooltip from '../Tooltip/Tooltip'

import { useLocation } from 'react-router-dom'
import { StateContext } from '../../App'
import fillData from '../../utilities/fillData'


const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

const Calendar = () => {

  const {state} = React.useContext(StateContext)
  const [calendarData, setCalendarData] = React.useState<Date[]>([])

  const {pathname} = useLocation()

  React.useEffect(()=>{
    setCalendarData(fillData(new Date(+state.year, +state.month-1,1)))
  },[state.month, state.year])

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toDateString()

  const clName =(today: boolean, isDefault: boolean) => classNames({
    [styles.today]: today && (new Date()).getMonth().toString() === state.month,
    [styles.default]: isDefault
  })

  const notesInDay = (day: Date, master: 'Катя' | 'Лена') => {
    return String(day.getMonth()+1) === state.month && state.days[day.getDate().toString()]?.some(note => note.master === master)
  }

  return (
    <div className={styles.container}>
      <div className={styles.week}>
        {days.map(day =>
          <div key={day} className={styles.dayName}>
            {day}
          </div>
        )}
      </div>
      <div className={styles.flex}>
        {calendarData.map(el =>
          <Link to={`/${el.toLocaleDateString()}`} key={el.toString()} state={{prev: pathname}}>
            <div className={styles.day}>
              <Tooltip
                master1={notesInDay(el, 'Катя')}
                master2={notesInDay(el, 'Лена')}
                />
              <h3 className={clName(el.toDateString() === today,  String(el.getMonth()+1) === state.month)}>
                {el.getDate()}
              </h3>
            </div>
          </Link>
          )}
      </div>
    </div>
  )
}

export default Calendar