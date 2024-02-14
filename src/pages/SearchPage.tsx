import React from 'react'
import styles from '../styles/SearchPage.module.scss'

const SearchPage = () => {

  const [searchType, setSearchType] = React.useState<'notes' | 'clients'>('notes')

  const toggleSearchType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'notes' | 'clients'
    setSearchType(value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['input-container']}>
        <input type='text' placeholder='Начните писать..' />
        <button>
          <img src='public/search-colored.png' width={28} height={28} />
        </button>
      </div>
      <div className={`${styles.toggler} ${searchType === 'clients' ? styles['toggler-right'] : styles['toggler-left']}`}>
        <input
          type='radio'
          name='serchType'
          id='notes'
          value={'notes'}
          checked={searchType === 'notes'}
          onChange={toggleSearchType}
        />
        <label htmlFor='notes' > Заметки</label>
        <input
        type='radio'
        name='serchType'
        id='clients'
        value={'clients'}
        checked={searchType === 'clients'}
        onChange={toggleSearchType}
        />
        <label htmlFor='clients' > Клиенты</label>
      </div>
      <div className={styles.list}>

      </div>
    </div>
  )
}

export default SearchPage