
import styles from './NoteItem.module.scss'

import type {INote} from '../../../types'

const NoteItem = (props: INote) => {

  const {time, content, client, master,day,month, year} = props

  return (
    <div className={styles.item}>
      <p className={styles.container}>
      <span>{`${day}.${month}.${year}`}</span>
      <span>{`${time.from} - ${time.to}`}</span>
      </p>
      <p className={styles.container}>
        <span>Клиент: {client.name}</span>
        <span>Мастер: {master}</span>
      </p>
      <p>{content}</p>
    </div>
  )
}

export default NoteItem