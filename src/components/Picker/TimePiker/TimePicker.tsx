//import React from 'react'
import Wheel from '../Wheel/Wheel'
import { stringifyValue } from '../../../utilities/stringifyValue'
import styles from './TimePicker.module.scss'

type TimePickerProps = {
  timeValue: string;
  changeTime: (time: string) => void
}

const hours =  [-1,8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ,20,-2]
const minutes = [-1,0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,-2]

const TimePicker = ({timeValue, changeTime}: TimePickerProps) => {

  const setHours = (hours: number) => {
    const timeArr = timeValue.split(':')
    //timeArr[0] = hours === 'f'  ? '00' : hours ===  'h' ? '20' : hours
    timeArr[0] = stringifyValue(hours)
    const selectedTime = timeArr.join(':')
    changeTime(selectedTime)
  }

  const setMinutes = (minutes: number) => {
    const timeArr = timeValue.split(':')
    //timeArr[1] = minutes === 's' ? '00' : minutes === 'n' ? '55' : minutes
    timeArr[1] = stringifyValue(minutes)
    const selectedTime = timeArr.join(':')
    changeTime(selectedTime)
  }


  return (
    <div className={styles.wrapper}>
      <Wheel key={'hours'} value={Number(timeValue.split(':')[0])} values={hours} onChange={setHours} />
      <span>:</span>
      <Wheel key={'minutes'} value={Number(timeValue.split(':')[1])} values={minutes} onChange={setMinutes} />
    </div>
  )
}

export default TimePicker