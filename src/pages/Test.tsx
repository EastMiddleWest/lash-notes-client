import React from 'react'
import ClientSelect from '../components/ClientSelect/ClientSelect'

const Test = () => {

  const [value, setValue] = React.useState(null)

  console.log(value)

  return (
    <div style={{padding: "2em", width: '100%', height: '100%', backgroundColor: '#dfdfdf'}}>
      <ClientSelect value={value} onChange={setValue} />
    </div>
  )
}

export default Test