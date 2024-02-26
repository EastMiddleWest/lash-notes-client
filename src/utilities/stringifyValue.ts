export const stringifyValue = (value: number): string => {
  if(value < 0) return ''
  else return value < 10 ? '0'+value : String(value)
}