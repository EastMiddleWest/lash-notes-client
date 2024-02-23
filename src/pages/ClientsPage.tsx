import React from 'react'
import styles from '../styles/ClientsPage.module.scss'
import ApiController from '../controllers/apiController'
import SearchDataList from '../components/SearchDataList/SearchDataList'

import type { ICustomer, ModalProps } from '../types'

type ClientsPageProps = {
  toggleModal: (args: ModalProps['action']) => void;
}

const ClientsPage = ({toggleModal}: ClientsPageProps) => {

  const [value, setValue] = React.useState('')
  const [searchData, setSearchData] = React.useState<ICustomer[]>([])

  const handler = async () => {
    const data = await ApiController.serchClients(value)
    setSearchData(data)
  }

  const openCutomerModal = () => {
    toggleModal({
      type: 'add customer',
      defaultData: {
        id: '',
        name: '',
        contacts: {
          telegram:'',
          phone: ''
        }
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h2>Поиск клиентов</h2>
        <button className={styles['add-btn']} onClick={openCutomerModal} >
          <img src='/add-white.png' width={24} height={24} />
        </button>
      </div>
      <div className={styles['input-container']}>
        <input
          type='text'
          placeholder='Начните писать..'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handler} disabled={!value}>
          <img src='/search-colored.png' width={28} height={28} />
        </button>
      </div>
      {/* <div className={`${styles.toggler} ${searchType === 'clients' ? styles['toggler-right'] : styles['toggler-left']}`}>
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
      </div> */}
      <SearchDataList data={searchData} />
    </div>
  )
}

export default ClientsPage