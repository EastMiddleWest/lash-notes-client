
export const createDateString = (day?: string, month?: string, year?: string) => {
  let date: Date
  if(day && month && year){
    date = new Date(Number(year), Number(month)-1, Number(day))
  }
  else date = new Date()
  return {
    dateValue: date,
    stringValue:`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  }
}