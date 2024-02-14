
import type {INote} from '../../types'
import styles from './Notecard.module.scss'

type NoteCardProps = {
  note: INote
}

const NoteCard = ({note}: NoteCardProps) => {
  return (
    <div className={styles.card}>
      <span>{`${note.time.from} - ${note.time.to}`}</span>
      <p>{note.content}</p>
    </div>
  )
}

export default NoteCard