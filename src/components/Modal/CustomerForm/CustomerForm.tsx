import React from 'react'
import styles from './CustomerForm.module.scss'
import ApiController from '../../../controllers/apiController'
import { useForm, SubmitHandler } from "react-hook-form"
import type { CustomerData, ICustomer } from '../../../types'
import { useNavigate } from "react-router-dom";
import { StateContext } from '../../../App'
import RemoveButton from '../../RemoveButton/RemoveButton'

type CustomerFormprops = {
  type: 'add customer' | 'update customer';
  handleClose: () => void;
  defaultData: CustomerData;
  onSubmit?: (data: ICustomer) => void
}

type Inputs = Omit<CustomerData, 'id'>


const CustomerForm = ({ type, handleClose, defaultData, onSubmit: onSubmitHandler }: CustomerFormprops) => {

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<Inputs>({defaultValues:defaultData})

  const {dispatch} = React.useContext(StateContext)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = async (formData, event) => {
    event?.preventDefault()
    const clientData = {
      name: formData.name,
      contacts: {
        telegram: {
          chatId: 0,
          firstName: '',
          username: formData.contacts.telegram
        },
        phone: formData.contacts.phone
      }
    }
    dispatch({type: 'toggleLoadingState', payload: true})
    if(type === 'add customer'){
      try {
        const newClient = await ApiController.addClient(clientData)
        if(newClient){
          dispatch({type: 'toggleLoadingResult', payload: 'succes'})
        }
        else dispatch({type: 'toggleLoadingResult', payload: 'error'})
      } catch (error) {
        dispatch({type: 'toggleLoadingResult', payload: 'error'})
      }
    }
    else {
      try {
        const newClient = await ApiController.updateClient(defaultData.id, clientData)
        if(newClient){
          onSubmitHandler && onSubmitHandler(newClient)
          dispatch({type: 'toggleLoadingResult', payload: 'succes'})
        }
        else dispatch({type: 'toggleLoadingResult', payload: 'error'})
      } catch (error) {
        dispatch({type: 'toggleLoadingResult', payload: 'error'})
      }
    }
    handleClose()
  }

  const removeCustomer = async () => {
    dispatch({type: 'toggleLoadingState', payload: true})
    try {
      const res = await ApiController.deleteClient(defaultData.id)
      if(res) dispatch({type: 'toggleLoadingResult', payload: 'succes'})
      else dispatch({type: 'toggleLoadingResult', payload: 'error'})
    } catch (error) {
      dispatch({type: 'toggleLoadingResult', payload: 'error'})
    }
    handleClose()
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles['btn-container']}>
        {type === 'update customer' &&
          <RemoveButton handler={removeCustomer}/>
        }
        <button type='button' className={styles.btn_close} onClick={handleClose} >
          <img src='/close-white.png' />
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>{type === 'add customer' ? 'Создать клиента' : 'Редактировать клиента'}</h2>
        <input
          {...register('name', {required: true})}
          type='text'
          placeholder='Имя'
          />
        <input
          {...register('contacts.telegram')}
          placeholder='telegram'
          />
        <input
          {...register('contacts.phone')}
          placeholder='Телефон'
          />
        <button className={styles.btn} >
          {type === 'add customer' ? 'Создать' : 'Редактировать'}
        </button>
      </form>
    </div>
  )
}

export default CustomerForm