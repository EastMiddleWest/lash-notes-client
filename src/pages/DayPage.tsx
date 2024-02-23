
import React from 'react'
import styles from '../styles/DayPage.module.scss';

import TimeGrid from '../components/TimeGrid/TimeGrid'
import MasterList from '../components/MasterList/MasterList'

import { useLocation, useNavigate } from 'react-router-dom'
import { StateContext } from '../App'

import { motion } from "framer-motion"

import type{ ModalProps } from '../types'

type DayPageProps = {updateNote: (data: ModalProps['action']) => void}

const DayPage = ({ updateNote }: DayPageProps) => {

  const {state,dispatch} = React.useContext(StateContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [date, month, year] = location.pathname.replace('/','').split('.')

  //console.log('state in DayPage: ', state)

  React.useEffect(()=>{
    const stringMonth = String(+month)
    if(state.month !== stringMonth || state.year !== year ){
      dispatch({type: 'setDate', payload: {year, month: stringMonth}})
    }
  },[ month, year, state, dispatch])

  const getInitialVariant = () => {
    const {pathname, state} = location
    const date = new Date(pathname.replace('/','').split('.').reverse().join('-'))
    date.setDate(date.getDate()+1)
    const nextDate = date.getDate()
    const historyDate = new Date(state.prev.replace('/','').split('.').reverse().join('-'))
    if(historyDate.toString() === 'Invalid Date') {
      return 'initial'
    }
    else {
      return nextDate === historyDate.getDate() ? 'initialFromLeft' : 'initialFromRight'
    }
  }

  const variants = {
    initial: { opacity: 0},
    initialFromRight: { x: 300, opacity: 0},
    initialFromLeft: { x: -300, opacity: 0},
    animate: {
      x: 0,
      opacity: 1,
      transition: {duration: 1}
    }
  }

  const navigateOnDrag = (offsetX: number) => {
    const currentDate = new Date(`${year}-${month}-${date}`)
    if(offsetX < -150){
      currentDate.setDate(currentDate.getDate()+1)
      navigate(`/${currentDate.toLocaleDateString()}`,{state:{prev: location.pathname}})
    }
    else if(offsetX > 150){
      currentDate.setDate(currentDate.getDate()-1)
      navigate(`/${currentDate.toLocaleDateString()}`,{state:{prev: location.pathname}})
    }
  }


  return (
    <>
    {!state.isLoading.state ?
    <motion.div
      className={styles.wrapper}
      initial={getInitialVariant()}
      animate='animate'
      variants={variants}
      drag='x'
      dragConstraints={{ left: -window.innerWidth/2, right: window.innerWidth/2 }}
      dragSnapToOrigin
      dragElastic={0.2}
      onDragEnd={(_event, info) => navigateOnDrag(info.offset.x)}
      >
      <h2>{`${date}.${month}.${year}`}</h2>
      <TimeGrid>
        <MasterList data={state.days[String(+date)]} updateNote={updateNote} />
      </TimeGrid>
    </motion.div>
    :null
    }
    </>
  )
}

export default DayPage