
import styles from './TimeGrid.module.scss'

const timeArr = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00',]

type TimeGridProps = {
  children: JSX.Element
}

const TimeGrid = ({children}: TimeGridProps) => {
  return (
    <div className={styles.table}>
      <div className={styles.head}>
          <span></span>
          <div>
            <h4>Катя</h4>
          </div>
          <div>
            <h4>Лена</h4>
          </div>
      </div>
      <div className={styles.timelist}>
        {timeArr.map(time =>
          <div key={time}>{time}</div>
          )}
      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}

export default TimeGrid