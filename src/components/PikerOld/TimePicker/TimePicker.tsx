

import React from 'react'
import styles from './TimePicker.module.scss'
import Wheel from '../Wheel/Wheel'

const hours =  ['s','08','09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19' ,'20','e']
const minutes = ['s','00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55','e']

type TimePickerProps = {
  timeValue: string;
  changeTime: (time: string) => void
}

const TimePicker: React.FC<TimePickerProps> = ({timeValue,changeTime}) => {


  const setHours = (hours: string) => {
    const timeArr = timeValue.split(':')
    timeArr[0] = hours === 'f'  ? '00' : hours ===  'h' ? '20' : hours
    const selectedTime = timeArr.join(':')
    changeTime(selectedTime)
  }

  const setMinutes = (minutes: string) => {
    const timeArr = timeValue.split(':')
    timeArr[1] = minutes === 's' ? '00' : minutes === 'n' ? '55' : minutes
    const selectedTime = timeArr.join(':')
    changeTime(selectedTime)
  }


  return (
    <div className={styles.wrapper}>
      <Wheel key={'from'} values={hours} value={timeValue.split(':')[0]} handler={setHours} />
      <span>:</span>
      <Wheel key={'to'} values={minutes} value={timeValue.split(':')[1]} handler={setMinutes} />
    </div>
  )
}

export default TimePicker