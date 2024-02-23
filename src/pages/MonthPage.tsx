import React from 'react'
import styles from '../styles/MonthPage.module.scss';

import Calendar from '../components/Calendar/Calendar';
import MonthToggler from '../components/MonthToggler/MonthToggler';

import { StateContext } from '../App';

import { motion } from "framer-motion"

const MonthPage = () => {

  const {state,dispatch} = React.useContext(StateContext)

  React.useEffect(()=>{
    if(!state.month || !state.year){
      const today = new Date()
      const currentMonth = String(today.getMonth()+1)
      const currentYear = String(today.getFullYear())
      dispatch({type: 'setDate', payload: {year: currentYear, month: currentMonth}})
    }

  //eslint-disable-next-line react-hooks/exhaustive-deps

  },[dispatch, state.month, state.year])

  const variants2 = {
    initial: {  opacity: 0},
    animate: {  opacity: 1}
  }

  return (
    <motion.div
    initial='initial'
    animate='animate'
    variants={variants2}
    className={styles.wrapper}
    >
      <MonthToggler />
      <Calendar />
    </motion.div>
  )
}

export default MonthPage