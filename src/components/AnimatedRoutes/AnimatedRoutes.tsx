
import {Routes, Route, useLocation} from 'react-router-dom'
import styles from './AnimatedRoutes.module.scss'

import Header from '../Header/Header'
import MonthPage from '../../pages/MonthPage'
import DayPage from '../../pages/DayPage'
//import SearchPage from '../../pages/SearchPage'

import type { ModalProps } from '../../types'

import {AnimatePresence} from 'framer-motion'


type AnimatedRoutesProps = {
  handleOpenModal: (data: ModalProps['action']) => void
}

const AnimatedRoutes = ({handleOpenModal}: AnimatedRoutesProps) => {

  const location = useLocation()

  return (
    <>
    <Header toggleModal={handleOpenModal}/>
    <main className={styles.app}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<MonthPage/>} />
            <Route path='/:day' element={<DayPage updateNote={handleOpenModal}/>} />
          </Routes>
        </AnimatePresence>
    </main>
    </>
  )
}

export default AnimatedRoutes