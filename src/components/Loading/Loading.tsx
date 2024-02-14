import React from 'react'
import { motion } from "framer-motion"
import styles from './Loading.module.scss'


const Loading = () => {

  React.useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'scroll'
    }
  },[])

  const draw = {
    hidden: { pathLength: 0},
    visible: {
        pathLength: 1,
        transition: {
          pathLength: {  duration: 1,repeat: Infinity },
        }
    }
  }

  return (
    <div className={styles.loading}>
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
        transition={{ repeat: Infinity}}
      >
        <motion.circle
          cx="300"
          cy="300"
          r="80"
          stroke="#00cc88"
          variants={draw}
          transition={{ repeat: Infinity}}
        />
      </motion.svg>
    </div>
  )
}

export default Loading