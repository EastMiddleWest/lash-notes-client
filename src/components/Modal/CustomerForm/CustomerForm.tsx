import React from 'react'
import styles from './CustomerForm.module.scss'

import type { ICustomer } from '../../../types'

type CustomerFormprops = {
  type: 'add customer' | 'update customer';
  handleClose: () => void;
  defaultData: ICustomer;
}

const CustomerForm = ({ type, handleClose, defaultData }: CustomerFormprops) => {

  const [name, setName] = React.useState(defaultData.name)
  const [content, setContent] = React.useState(defaultData.content)

  const removeCustomer = () => {

  }

  return (
    <div className={styles.container}>
      <div className={styles['btn-container']}>
      {type === 'update customer' &&
        <button type='button' className={styles.btn_delete} onClick={removeCustomer} >
          <img src='/delete-white.png' width={26} height={26} />
        </button>}
        <button type='button' className={styles.btn_close} onClick={handleClose} >
          <img src='/close-white.png' />
        </button>
      </div>
      <h2>Создать клиента</h2>
      <input
      type='text'
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder='Имя'
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Описание'
      />
      <button className={styles.btn}>
        Создать
      </button>
    </div>
  )
}

export default CustomerForm