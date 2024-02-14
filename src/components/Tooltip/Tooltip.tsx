
import styles from './Tooltip.module.scss'

type TooltipProps = {
  master1: boolean;
  master2: boolean;
}

const Tooltip = ({master1, master2}:TooltipProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      {master1 && <div className={styles.master1}></div>}
      {master2 && <div className={styles.master2}></div>}
      </div>
    </div>
  )
}

export default Tooltip