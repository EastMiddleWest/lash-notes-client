import React from 'react'
import { motion } from "framer-motion"
import styles from './Loading.module.scss'

import { StateContext } from '../../App'

const Loading = () => {

  const {state, dispatch} = React.useContext(StateContext)

  React.useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'scroll'
    }
  },[])

  const drawInfinite = {
    hidden: { pathLength: 0},
    visible: {
        pathLength: 1,
        transition: {
          pathLength: {  duration: 1, repeat: Infinity },
        }
    }
  }

  const drawOnce = {
    hidden: { pathLength: 0},
    visible: {
        pathLength: 1,
        transition: {
          pathLength: {  duration: 0.5 },
        }
    }
  }

  const cancel = () => {
    dispatch({type: 'toggleLoadingState', payload: false})
  }


  return (
    <div className={styles.loading}>
      {(state.isLoading.state && !state.isLoading.result) &&
      <motion.svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="150"
          cy="150"
          r="80"
          stroke="#00cc88"
          variants={drawInfinite}
          />
      </motion.svg>
      }
      {state.isLoading.result === 'error' &&
      <motion.svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        initial="hidden"
        animate="visible"
        onAnimationComplete={cancel}
      >
        <motion.line
        x1="75"
        y1="75"
        x2="225"
        y2="225"
        stroke="#ff0055"
        strokeWidth="15"
        strokeLinecap="round"
        variants={drawOnce}
        />
        <motion.line
        x1="75"
        y1="225"
        x2="225"
        y2="75"
        stroke="#ff0055"
        strokeLinecap="round"
        strokeWidth="15"
        variants={drawOnce}
        />
      </motion.svg>
      }
      {state.isLoading.result === 'succes' &&
      <motion.svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      initial="hidden"
      animate="visible"
      onAnimationComplete={cancel}
      >
        <motion.path
          d="M7.75 12.75l6 6 9-13.5"
          stroke="#00cc88"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={drawOnce}
          transform={"scale(10)"}
          />
      </motion.svg>
      }
    </div>
  )
}

export default Loading
