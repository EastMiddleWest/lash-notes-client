import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../styles/ClientPage.module.scss'
import {initState, reducer} from '../utilities/clientPageState'
//import EditableField from '../components/EditableField/EditableField'
import NoteItem from '../components/SearchDataList/NoteItem/NoteItem'
import ApiController from '../controllers/apiController'

import type {ModalProps} from '../types'

type ClientPageProps = {
  toggleModal: (args: ModalProps['action']) => void;
}

const ClientPage = ({toggleModal}: ClientPageProps) => {

  const {pathname} = useLocation()

  const [state, dispatch] = React.useReducer( reducer, initState)

  React.useEffect(()=>{
    const id = pathname.replace('/clients/','')
    ApiController.getClientById(id).then(data => {
      if(data) dispatch({type: 'init', payload: data})
    })
  },[pathname])


  const openClientForm = () => {
    toggleModal({
      type: 'update customer',
      defaultData: {
        id: state._id,
        name: state.name,
        contacts: {
          telegram: state.contacts.telegram?.username || '',
          phone: state.contacts.phone || ''
        }
      },
      onSubmit: (data) =>{
        console.log(data)
        dispatch({type: 'setCustomer', payload: data})
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      {/* <EditableField
        type='text'
        fieldName='Имя'
        value={state.name}
        onChange={(name) => dispatch({type:'setName', payload:name})}
      />
      <EditableField
        type='tel'
        fieldName='Telegram'
        value={state.contacts.telegram?.username ||  ""}
        onChange={(phone) => dispatch({type: 'setPhone', payload: phone})}
      /> */}
      <div className={styles['info-container']}>
        <div className={styles.info}>
          <p>Имя: <span>{state.name}</span></p>
          <p>Телефон: <span>{state.contacts.phone}</span></p>
          <p>Telegram: <span>{state.contacts.telegram?.username}</span></p>
        </div>
        <div className={styles['btn-container']}>
          <button onClick={openClientForm}>
            <img src='/src/assets/data-recovery.png' width={24} height={24} />
          </button>
        </div>
      </div>
      <ul className={styles.notes}>
        {state.notes.map(note =>
          <li key={note._id}>
            <NoteItem  {...{...note, client: {_id: state._id, name: state.name}}}/>
          </li>
          )}
      </ul>
      </div>
    </div>
  )
}

export default ClientPage