import React from 'react'
import styles from './Wheel.module.scss'

import Reel from './Reel/Reel'

import { createScrollStopListener } from '../utillities'

type WheelProps = {
  value: number;
  values: number[];
  isMonth?: boolean;
  onChange: (value: number) => void
}


const Wheel = ({value, values, isMonth,onChange}: WheelProps) => {

  //console.log('render')

  const divRef = React.useRef<HTMLDivElement>(null)
  const valueRef = React.useRef<number>(value)

  const handler = React.useCallback(() => {
    const newValue = valueRef.current
    //console.log('start handler')
    if(value !== newValue){
      //console.log('set value ',valueRef)
      onChange(newValue)
    }
    else if(divRef.current){
      const index = values.indexOf(newValue) - 1;
      const position = index * 50;
      if(index >= 0) {
        //console.log('value: ',newValue,' position: ', position)
        divRef.current.scrollTo({ top: position, behavior: "smooth" });
      }
    }
  },[onChange, value, values])

  React.useEffect(() => {
    let destroy: () => void
    if (divRef.current) {
      destroy = createScrollStopListener(divRef.current, handler, 350)
      const index = values.indexOf(value) - 1;
      const position = index * 50;
      if(index >= 0) {
        //console.log('eff ','value: ',value,' position: ', position)
        divRef.current.scrollTo({ top: position, behavior: "smooth" });
      }
    }
    return () => destroy()
  }, [value, values,handler]);


  const changeValue = (value: number) => {
    valueRef.current = value
    //console.log('set valueREF: ', valueRef)
  }


  return (
    <div ref={divRef} className={styles.wheel}>
      {values.map(el =>
        <Reel key={el} value={el} isMonth={isMonth} handler={changeValue} ref={divRef} />
      )}
    </div>
  )
}

export default Wheel