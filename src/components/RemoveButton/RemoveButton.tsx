import React from 'react'
import styles from './RemoveButton.module.scss'
import {motion, AnimatePresence} from 'framer-motion'

type RemoveBtnProps = {
  handler: () => void
}

const RemoveButton = ({handler}: RemoveBtnProps) => {

  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} type='button' onClick={toggleOpen}>
        {isOpen ?
          <img src='/src/assets/close-white.png' width={26} height={26} />
          :
          <img src='/src/assets/delete-white.png' width={26} height={26} />
        }
      </button>
      <AnimatePresence>
        {isOpen &&
          <motion.div
          className={styles.options}
          style={{originX:'left', originY:'top'}}
          initial={{scale: 0}}
          animate={{ scale: 1 }}
          exit={{scale: 0, transition: {ease: 'backIn', duration: 0.35 }}}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
          >
            <p>Удалить?</p>
            <button type='button' onClick={() => setIsOpen(false)}>
              <img src='/src/assets/deny.png' width={32} height={32} />
            </button>
            <button type='button' onClick={handler}>
              <img src='/src/assets/apply.png' width={32} height={32} />
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default RemoveButton