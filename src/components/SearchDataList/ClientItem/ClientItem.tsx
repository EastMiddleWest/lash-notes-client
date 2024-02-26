import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ClientItem.module.scss'
import classNames from 'classnames/dedupe'
import type {ICustomer} from '../../../types'

const ClientItem = (props: ICustomer) => {

  const [isOpen, setIsOpen] = React.useState(false)

  const notelistClName = classNames(styles.notelist,{
    [styles['notelist-open']]: isOpen,
    [styles['notelist-closed']]: !isOpen
  })

  return (
    <div className={styles.item}>
      <p className={styles.container}>
        <Link to={`/clients/${props._id}`}>
          <span>{props.name}</span>
        </Link>
        {props.notes.length > 0 &&
        <button onClick={() => setIsOpen(prev => !prev)}>
          <img className={isOpen ? styles['arrow-up'] : styles['arrow-down']} src='/chevron.png' width={18} height={18} />
        </button>}
      </p>
      <ul className={notelistClName}>
        {props.notes.map(note =>
          <li key={note._id} className={styles.note}>
            <p>
              <span>{`${note.day}.${note.month}.${note.year}`}</span>
              <span>{`${note.time.from} - ${note.time.to}`}</span>
            </p>
            <p>Мастер: {note.master}</p>
            <p>{note.content}</p>
          </li>
          )}
      </ul>
    </div>
  )
}

export default ClientItem