import React from 'react'
import styles from './MonthToggler.module.scss'

import { StateContext } from '../../App'

const monthArr = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь',]


const MonthToggler = () => {

  const {state, dispatch} = React.useContext(StateContext)

  const toggler = (action: 'next' | 'prev') => {
    let settedMonth = action === 'next' ? +state.month + 1 : +state.month-1
    let settedYear = +state.year
    if(settedMonth > 12) {
      settedYear += 1
      settedMonth = 1
    }
    else if(settedMonth < 1){
      settedYear -= 1
      settedMonth = 12
    }
    dispatch({type: 'setDate', payload:{year: String(settedYear), month: String(settedMonth)}})
    // ApiController.getNotesByMonth(String(settedMonth), String(settedYear))
    // .then(data => dispatch({type: 'setNotes', payload: {year: String(settedYear), month: String(settedMonth), notes: data}}))
  }

  return (
    <div className={styles.toggler}>
      <button onClick={() => toggler('prev')} >
        <img src='/arrow_left.png' width={32} height={32} />
      </button>
      <h2>{monthArr[+state.month-1] +' '+ state.year}</h2>
      <button onClick={() => toggler('next')} >
        <img src='/arrow_right.png' width={32} height={32} />
      </button>
    </div>
  )
}

export default MonthToggler