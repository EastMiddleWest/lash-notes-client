
import styles from './Header.module.scss'
import {Link, useLocation} from 'react-router-dom'

import type {ModalProps} from '../../types'

type HeaderProps = {
  toggleModal: (args: ModalProps['action']) => void;
}

const Header = ({toggleModal}: HeaderProps) => {


  const {pathname} = useLocation()

  const handleShowAddModal = () => {
    if(pathname.match(/[a-zA-Z]/)){
      const today = new Date()
      toggleModal({
        type: 'add note',
        defaultData:{
          _id: '',
          day: String(today.getDate()),
          month: String(today.getMonth()+1),
          year: String(today.getFullYear()),
          time:{
            from: '08:00',
            to: '09:00'
          },
          client: {
            _id: '',
            name: ''
          },
          master:'Катя',
          content: ''
        }
      })
    } else {
      const date = pathname.replace('/','').split('.')
      toggleModal({
        type: 'add note',
        defaultData:{
          _id: '',
          day: String(+date[0]),
          month: String(+date[1]),
          year: String(date[2]),
          time:{
            from: '08:00',
            to: '09:00'
          },
          client: {
            _id: '',
            name: ''
          },
          master:'Катя',
          content: ''
        }
      })
    }
  }


  return (
    <header className={styles.header}>
      <Link to={'/'} state={{prev: pathname}}>
        <img src='/public/home_white.png' />
      </Link>
      <div className={styles.btn_container}>
        <Link to={'/clients'} state={{prev: pathname}}>
          <button>
          <img src='/user-white.png' width={24} height={24} />
          </button>
        </Link>
        {/* <button onClick={openCutomerModal}  >
          <img src='/src/assets/user-white.png' width={24} height={24} />
        </button> */}
        <button onClick={handleShowAddModal}  >
          <img src='public/add-white.png' width={24} height={24} />
        </button>
      </div>
    </header>
  )
}

export default Header