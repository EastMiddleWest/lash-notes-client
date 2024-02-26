

import React from 'react'
import styles from './DatePicker.module.scss'
import Wheel from '../Wheel/Wheel'

const monthes = ['s','Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек','e']
const years = ['s','2023','2024','2025','e']

type DatePickerProps = {
  dayValue: string;
  monthValue: string;
  yearValue: string;
  changeDay: (day: string) => void
  changeMonth: (month: string) => void
  changeYear: (year: string) => void
}

function getDaysOfMonth({month, year}: ReturnType<typeof getDateString> ){
  let i = 0
  const days = (new Array(27)).fill(0).map(() => ++i)
  const newDate = new Date(year, month)
  newDate.setDate(++i)
  while (newDate.getDate() === i) {
    days.push(i++)
    newDate.setDate(i)
  }
  return ['s',...days.map(el => el.toString()),'e']
}

const getDateString = ( month: string, year: string) => {
  const monthIndex = monthes.indexOf(month)
  return {year: Number(year), month: monthIndex-1}
}

const DatePicker: React.FC<DatePickerProps> = ({dayValue,monthValue,yearValue,changeMonth, changeDay,changeYear}) => {

  const setMonth = (month: string) => {
    changeMonth(month)
  }

  const setDay = (day: string) => {
    changeDay(day)
  }

  const setYear = (year: string) => {
    changeYear(year)
  }

  const [dates, setDates] = React.useState<string[]>([])

  console.log(dayValue, monthValue, yearValue)

  React.useEffect(()=>{
    setDates(getDaysOfMonth(getDateString( monthValue, yearValue)))
  },[monthValue, yearValue])

  return (
    <div className={styles.wrapper}>
      <Wheel key={'date'} values={dates} value={dayValue} handler={setDay} />
      <Wheel key={'month'} values={monthes} value={monthValue} handler={setMonth} />
      <Wheel key={'year'} values={years} value={yearValue} handler={setYear} />
    </div>
  )
}

export default DatePicker