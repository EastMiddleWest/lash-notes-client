import styles from './SearchDataList.module.scss'
import ClientItem from './ClientItem/ClientItem'
import NoteItem from './NoteItem/NoteItem'

import type {INote, ICustomer} from '../../types'

type SearchDataListProps = {
  data: INote[] | ICustomer[]
}


const SearchDataList = ({data}: SearchDataListProps) => {

  const isNoteDataType = (data: INote[] | ICustomer[]): data is INote[] => {
    return 'client' in data[0]
  }



  return (
    <div className={styles.list}>
      {data.length > 0 ? isNoteDataType(data) ?
        data.map(el => <NoteItem key={el._id} {...el} />)
        :
        data.map(el => <ClientItem key={el._id} {...el}/>)
        : null
      }
    </div>
  )
}

export default SearchDataList