import React from 'react'
import styles from './NoteForm.module.scss'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
//import DatePicker from '../../Piker/DatePicker/DatePicker'
//import TimePicker from '../../Piker/TimePicker/TimePicker'
import DatePicker from '../../Picker/DatePicker/DatePicker'
import TimePicker from '../../Picker/TimePiker/TimePicker'
import RemoveButton from '../../RemoveButton/RemoveButton'
import ClientSelect from '../../ClientSelect/ClientSelect'

import { StateContext } from '../../../App'
import ApiController, { type NoteData} from '../../../controllers/apiController'

import type {NoteFormProps, Inputs } from './NoteForm.types'


const NoteForm = ({type, handleClose, defaultData}: NoteFormProps) => {

  const {dispatch} = React.useContext(StateContext)

  const defaultValues: Inputs = {
    date:{
      day: defaultData.day,
      month: defaultData.month,
      year: defaultData.year,
    },
    time: defaultData.time,
    client: defaultData.client._id ? {value: defaultData.client._id, label: defaultData.client.name} : null,
    master: defaultData.master,
    content: defaultData.content
  }


  //console.log(defaultData)

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({defaultValues})

  // const onTestSubmit: SubmitHandler<Inputs> = (formData, event) => {
  //   event?.preventDefault()
  //   console.log(formData)
  // }

  const onSubmit: SubmitHandler<Inputs> = async (formData, event) => {
    event?.preventDefault()
    const data: NoteData = {
      ...formData,
      year: formData.date.year,
      month: formData.date.month,
      day: formData.date.day,
      client: formData.client?.__isNew__ ? {name: formData.client.value} : formData.client!.value
    }

    if(type === 'add note'){
      dispatch({type: 'toggleLoadingState', payload: true})
      try {
        const note = await ApiController.addNote(data)
        if(note){
          dispatch({type:'addNote',payload: note})
          dispatch({type: 'toggleLoadingResult', payload: 'succes'})
        }
        else {
          dispatch({type: 'toggleLoadingResult', payload: 'error'})
        }
        //note && dispatch({type:'addNote',payload: note})
      } catch (error) {
        console.log(error)
        dispatch({type: 'toggleLoadingResult', payload: 'error'})
      }
      finally{
        handleClose()
        //dispatch({type: 'toggleLoadingState', payload: false})
      }
    } else{
      dispatch({type: 'toggleLoadingState', payload: true})
      try {
        const note = await ApiController.updateNote(data, defaultData._id)
        //note && dispatch({type:'updateNote',payload: note})
        if(note){
          dispatch({type:'updateNote',payload: note})
          dispatch({type: 'toggleLoadingResult', payload: 'succes'})
        }
        else {
          dispatch({type: 'toggleLoadingResult', payload: 'error'})
        }
      } catch (error) {
        console.log(error)
        dispatch({type: 'toggleLoadingResult', payload: 'error'})
      }
      finally{
        handleClose()
        //dispatch({type: 'toggleLoadingState', payload: false})
      }
    }
  }

  const removeNote = async () => {
    const id = defaultData._id
    dispatch({type: 'toggleLoadingState', payload: true})
    try {
      const deletedNoteId = await ApiController.deleteNote(id)
      if(deletedNoteId) {
        dispatch({type: 'deleteNote', payload: deletedNoteId})
        dispatch({type: 'toggleLoadingResult', payload: 'succes'})
      }
      else dispatch({type: 'toggleLoadingResult', payload: 'error'})
    } catch (error) {
      console.log(error)
      dispatch({type: 'toggleLoadingResult', payload: 'error'})
    }
    finally{
      handleClose()
      //dispatch({type: 'toggleLoadingState', payload: false})
    }
  }

  register('time.to',{validate: (value, formValues) => value > formValues.time.from})



  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.btn_container}>
        {type === 'update note' && <RemoveButton handler={removeNote} />}
        <button type='button' className={styles.btn_close} onClick={handleClose} >
          <img src='/close-white.png' width={26} height={26} />
        </button>
      </div>
      <h2>{type === 'add note' ? 'Новая заметка' : 'Редактировать'}</h2>
      <div className={styles.master_group}>
        <p>Мастер:</p>
        <div className={styles.radio_container}>
          <input
            {...register('master')}
            type='radio'
            name='master'
            id='master1'
            value={'Катя'}
            className={styles.radio}
          />
          <label htmlFor='master1'>Катя</label>
        </div>
        <div className={styles.radio_container}>
          <input
            {...register('master')}
            type='radio'
            name='master'
            id='master2'
            value={'Лена'}
            className={styles.radio}
            />
          <label htmlFor='master2'>Лена</label>
        </div>
      </div>
      <div className={styles.time}>
        <Controller
          control={control}
          name='time.from'
          render={({field}) =>
            <TimePicker
            key={'from'}
            timeValue={field.value}
            changeTime={(time) => field.onChange(time)}
          />}
        />
        <div className={errors.time?.to ? styles['time-error'] : ''}>
        <Controller
          control={control}
          name='time.to'
          render={({field})=>
          <TimePicker
            key={'to'}
            timeValue={field.value}
            changeTime={(time) => field.onChange(time)}
          />}
        />
        </div>
      </div>
      <div>
        <span>{getValues('date.day')}</span>
        <span>{getValues('date.month')}</span>
        <span>{getValues('date.year')}</span>
      </div>
      <Controller
      control={control}
      name='date'
      render={({field}) =>
        <DatePicker
          dayValue={field.value.day}
          //monthValue={monthes[Number(field.value.month)]}
          monthValue={field.value.month}
          yearValue={field.value.year}
          changeDay={(day) => field.onChange({...field.value, day})}
          //changeMonth={(month) => field.onChange({...field.value, month: String(monthes.indexOf(month))})}
          changeMonth={(month) => field.onChange({...field.value, month})}
          changeYear={(year) => field.onChange({...field.value, year})}
        />
      }
      />
      <Controller
        name='client'
        control={control}
        rules={{required: true, validate: (value) => {return !!value}}}
        render={({field,fieldState}) =>
          <ClientSelect
          value={field.value}
          error={!!fieldState.error}
          onChange={(newValue) => field.onChange(newValue)}
          />
        }
      />
      <textarea
        {...register('content')}
        className={styles.area}
        placeholder='Текст'
        aria-invalid={!!errors.content}
      />
      <button type='submit' className={styles.btn} >
        {type === 'add note' ? 'Создать' : 'Редактировать'}
      </button>
    </form>
  )
}

export default NoteForm