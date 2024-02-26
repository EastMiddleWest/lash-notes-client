import React from 'react'
import styles from './Reel.module.scss'
import classnames from 'classnames'
import { useInView } from "react-intersection-observer";
import { stringifyValue, getMonthName } from '../../utillities';

type ReelProps = {
  value: number;
  isMonth?: boolean
  handler: (value: number) => void
}

const setRef = (ref: React.ForwardedRef<HTMLDivElement>) => {
  if (typeof ref === 'function') return undefined;
  else if (ref) return ref.current;
}

const Reel = React.forwardRef<HTMLDivElement, ReelProps>(({value, isMonth,handler}, ref) => {

  const handleChange = (inV:boolean) => {
    if(inV){
      //console.log('in view: ', value)
      handler(value)
    }
  }

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.6,
    root: setRef(ref),
    rootMargin: '-50px 0px -50px 0px',
    onChange: handleChange
  });

  const clName = classnames(styles.reel, {
    [styles.selected] : inView,
    [styles['not-selected']]: !inView
  })

  return (
    <div className={clName} ref={inViewRef}>
      <p>
        {isMonth ? getMonthName(value) : stringifyValue(value)}
      </p>
    </div>
  )
})

Reel.displayName = 'Reel'

export default Reel