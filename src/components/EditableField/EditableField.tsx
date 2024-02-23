import React from 'react'
import styles from './EditableField.module.scss'

type EditableFieldProps = {
  fieldName: string;
  type: 'text' | 'tel'
  value: string;
  onChange: (value: string) => void
}

const EditableField = ({fieldName, type,value, onChange}: EditableFieldProps) => {

  const [isEditable, setIsEditable] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if(inputRef.current && isEditable){
      inputRef.current.focus()
    }
  }, [isEditable])


  return (
    <div className={styles.container}>
      <span>{fieldName} :</span>
      {isEditable ?
      <>
        <input
          ref={inputRef}
          type={type}
          //pattern='/+380.*/g'
          value={value}
          onChange={(e) =>onChange(e.target.value)}
        />
        <button onClick={() => setIsEditable(false)}>
          <img src='/src/assets/data-recovery.png' alt='' width={18} height={18} />
        </button>
      </>
      :
      <>
        <p>{value}</p>
      <button onClick={() => setIsEditable(true)}>
        <img src='/public/edit.png' width={18} height={18} />
      </button>
      </>
      }
    </div>
  )
}

export default EditableField