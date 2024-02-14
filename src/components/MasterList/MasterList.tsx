
import styles from './MasterList.module.scss'
import type{INote, ModalProps} from '../../types'

type MasterListProps = {
  data: INote[];
  updateNote: (data: ModalProps['action']) => void
}

const MasterList = ({data, updateNote}: MasterListProps) => {

  const setHeight = (from: string, to: string) => {
    const startTime = from.split(':').map(el => Number(el))
    const endTime = to.split(':').map(el => Number(el))
    const marginTop = startTime[0]*70 + startTime[1] - 8*70
    const height = endTime[0]*70 + endTime[1] - (startTime[0]*70 + startTime[1]) - 2
    return {marginTop, height}
  }

  const getLeftValue = (el: INote, i: number, arr: INote[]) => {
    return i !== 0 ? el.time.from < arr[i-1].time.to && i%2 ? 10 : 'auto' : 'auto'
  }

  return (
    <div className={styles.container} >
      <div className={styles.list}>
        {data && data
        .filter(note => note.master === 'Катя')
        .sort((a,b) => a.time.from > b.time.from ? 1 : -1)
        .map((el, i, arr) =>
          <div
            key={el._id}
            className={styles.note}
            style={{
              top: setHeight(el.time.from, el.time.to).marginTop,
              height: setHeight(el.time.from, el.time.to).height,
              //left: el.time.from < arr[i-1].time.to && i >= 1 && i%2 ? 10 : 'auto',
              left: getLeftValue(el, i, arr),
              zIndex: i
            }}
            onClick={() => updateNote({type: 'update note', defaultData:el})}
          >
            <strong>{el.time.from +'-'+ el.time.to}</strong>
            <p>{el.content}</p>
          </div>
          )}
      </div>
      <div className={styles.list}>
        {data && data.filter(note => note.master === 'Лена').map(el =>
          <div
            key={el._id}
            className={styles.note}
            style={{top: setHeight(el.time.from, el.time.to).marginTop, height: setHeight(el.time.from, el.time.to).height}}
            onClick={() => updateNote({type: 'update note', defaultData:el})}
          >
            <strong>{el.time.from +'-'+ el.time.to}</strong>
            <p>{el.content}</p>
          </div>
          )}
      </div>
    </div>
  )
}

export default MasterList