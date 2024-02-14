export default function fillData( defaultDate: Date): Date[]{
  const data = []
  let daysAmount = 34
  if(defaultDate.getMonth() === 1 && defaultDate.getDay() === 1) daysAmount = 27
  if(defaultDate.getFullYear()%4 === 0 && defaultDate.getMonth() === 1 && defaultDate.getDay() === 1) daysAmount = 28
  const lastDay = new Date(defaultDate.getFullYear(), defaultDate.getMonth(),31)
  let count = defaultDate.getDay() === 0 ?  -6 : 1-defaultDate.getDay()
  if((lastDay.getDate() === 31 && lastDay.getDay() === 1) || (count === -6 && defaultDate.getMonth() !== 1)) daysAmount = 41
  for(let i=0; i <= daysAmount; i++){
    const day = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1+count)
    data.push(day)
    count++
  }
  return data
}