import React from 'react'
import styles from './NoteForm.module.scss'
import DatePicker from '../../Piker/DatePicker/DatePicker'
import TimePicker from '../../Piker/TimePicker/TimePicker'
import RemoveButton from '../../RemoveButton/RemoveButton'
import ClientSelect, {OptionType} from '../../ClientSelect/ClientSelect'

import { StateContext } from '../../../App'
import ApiController from '../../../controllers/apiController'

import type {INote} from '../../../types'

type NoteFormProps = {
  type: 'add note' | 'update note';
  handleClose: () => void;
  defaultData: INote;
}


const monthes = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']

const NoteForm = ({type, handleClose, defaultData}: NoteFormProps) => {

  const {dispatch} = React.useContext(StateContext)

  const [timeFrom, setTimeFrom] = React.useState(defaultData.time.from)
  const [timeTo, setTimeTo] = React.useState(defaultData.time.to)
  const [master, setMaster] = React.useState(defaultData.master)
  const [month, setMonth] = React.useState(monthes[Number(+defaultData.month-1)])
  const [day, setDay] = React.useState(defaultData.day)
  const [year, setYear] = React.useState(defaultData.year)
  const [client, setClient] = React.useState<OptionType>(null)
  const [content, setContent] = React.useState(defaultData.content)
  const [error, setError] = React.useState('')

  const handleSetMaster = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaster(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(timeTo <= timeFrom || !content){
      setError('Пожалуйста заполните все поля')
      return
    }
    const data: Omit<INote, '_id'> = {
      year,
      day,
      month: String(monthes.indexOf(month)+1),
      time: {
        from: timeFrom,
        to: timeTo
      },
      master,
      content
    }
    if(type === 'add note'){
      dispatch({type: 'toggleLoading', payload: true})
      try {
        const note = await ApiController.addNote(data)
        note && dispatch({type:'addNote',payload: note})
        console.log('got response')
      } catch (error) {
        console.log('catched err: ',error)
      }
      finally{
        handleClose()
        dispatch({type: 'toggleLoading', payload: false})
      }
      // const note = await ApiController.addNote(data)
      // note && dispatch({type:'addNote',payload: note})
      // console.log('got response')
      // handleClose()
      // dispatch({type: 'toggleLoading', payload: false})
    } else{
      dispatch({type: 'toggleLoading', payload: true})
      const note = await ApiController.updateNote(data, defaultData._id)
      note && dispatch({type:'updateNote',payload: note})
      handleClose()
      dispatch({type: 'toggleLoading', payload: false})
    }
  }

  const removeNote = async () => {
    const id = defaultData._id
    dispatch({type: 'toggleLoading', payload: true})
    const deletedNoteId = await ApiController.deleteNote(id)
    deletedNoteId && dispatch({type: 'deleteNote', payload: deletedNoteId})
    handleClose()
    dispatch({type: 'toggleLoading', payload: false})
  }


  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.btn_container}>
        {type === 'update note' && <RemoveButton handler={removeNote} />}
        <button type='button' className={styles.btn_close} onClick={handleClose} >
          <img src='/close-white.png' />
        </button>
      </div>
      <h2>{type === 'add note' ? 'Новая заметка' : 'Редактировать'}</h2>
      <div className={styles.master_group}>
        <p>Мастер:</p>
        <div className={styles.radio_container}>
          <input
            type='radio'
            name='master'
            id='master1'
            value={'Катя'}
            onChange={handleSetMaster}
            checked={master === 'Катя'}
            className={styles.radio}
          />
          <label htmlFor='master1'>Катя</label>
        </div>
        <div className={styles.radio_container}>
          <input
            type='radio'
            name='master'
            id='master2'
            value={'Лена'}
            onChange={handleSetMaster}
            checked={master === 'Лена'}
            className={styles.radio}
            />
          <label htmlFor='master2'>Лена</label>
        </div>
      </div>
      <div className={styles.time}>
        <TimePicker key={'from'} timeValue={timeFrom} changeTime={setTimeFrom}/>
        <TimePicker key={'to'} timeValue={timeTo} changeTime={setTimeTo}/>
      </div>
      <DatePicker
        dayValue={day}
        monthValue={month}
        yearValue={year}
        changeDay={setDay}
        changeMonth={setMonth}
        changeYear={setYear}
        />
      <ClientSelect value={client} onChange={(newValue) => setClient(newValue)} />
      <textarea
        className={styles.area}
        placeholder='Текст'
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type='submit' className={styles.btn} >
        {type === 'add note' ? 'Создать' : 'Редактировать'}
      </button>
    </form>
  )
}

export default NoteForm