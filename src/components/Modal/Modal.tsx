import React from 'react'
import styles from './Modal.module.scss'
import NoteForm from './NoteForm/NoteForm'
import CustomerForm from './CustomerForm/CustomerForm'

import type { ModalProps } from '../../types'

const Modal = ({handleClose, action }: ModalProps) => {

  React.useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'scroll'
    }
  },[])


  return (
    <div className={styles.wrapper}>
      {action.type === 'add note' ?
        <NoteForm type={action.type} handleClose={handleClose} defaultData={action.defaultData} />
        :
      action.type === 'update note' ?
        <NoteForm type={action.type} handleClose={handleClose} defaultData={action.defaultData} />
        :
      action.type ==='add customer' ?
        <CustomerForm type={action.type} handleClose={handleClose} defaultData={action.defaultData} />
        :
        <CustomerForm type={action.type} handleClose={handleClose} defaultData={action.defaultData} onSubmit={action.onSubmit}  />
      }
    </div>
  )
}

export default Modal