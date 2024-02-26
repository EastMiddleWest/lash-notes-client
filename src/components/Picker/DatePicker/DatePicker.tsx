import React from 'react'
import Wheel from '../Wheel/Wheel'
import styles from './DatePicker.module.scss'

const monthes = [-1,1,2,3,4,5,6,7,8,9,10,11,12,-2]
const years = [-1,2023,2024,2025,-2]

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
  return [-1,...days,-2]
}

const getDateString = ( month: string, year: string) => {
  //const monthIndex = monthes.indexOf(month)
  return {year: Number(year), month: Number(month)-1}
}

const DatePicker = ({dayValue, monthValue, yearValue, changeDay, changeMonth, changeYear}: DatePickerProps) => {

  const setMonth = (month: number) => {
    changeMonth(String(month))
  }

  const setDay = (day: number) => {
    changeDay(String(day))
  }

  const setYear = (year: number) => {
    changeYear(String(year))
  }

  const [dates, setDates] = React.useState<number[]>([])

  console.log(dayValue, monthValue, yearValue)

  React.useEffect(()=>{
    setDates(getDaysOfMonth(getDateString( monthValue, yearValue)))
  },[monthValue, yearValue])

  return (
    <div className={styles.wrapper} >
      <Wheel key={'date'} values={dates} value={+dayValue} onChange={setDay} />
      <Wheel key={'month'} isMonth values={monthes} value={+monthValue} onChange={setMonth} />
      <Wheel key={'year'} values={years} value={+yearValue} onChange={setYear} />
    </div>
  )
}

export default DatePicker