import React from 'react'
import styles from './ClientSelect.module.scss'
//import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
//import { Options } from 'react-select'
import ApiController from '../../controllers/apiController';
import classNames from 'classnames';

import type {OptionType, ClientSelectProps} from './ClientSelect.types'

export { OptionType }


const DropdownIndicator = () => {
  return null
}

const ClientSelect = ({value, onChange, error}: ClientSelectProps) => {

  const [loading, setLoading] = React.useState(false)

  const loadOptions = async (inputValue: string,) => {
      setLoading(true)
      const res = await ApiController.serchClients(inputValue)
      const arr  = res.map(el => ({value: el._id, label: el.name}))
      setLoading(false)
      return arr
  };

  const controlClName = (isFocused: boolean) => classNames(styles.control,{
    [styles['control-focused']] : isFocused,
    [styles['control-error']]: error
  })


  return (
    <div>
      <AsyncCreatableSelect
        placeholder='Клиент'
        cacheOptions
        loadOptions={loadOptions}
        //defaultOptions
        components={{ DropdownIndicator }}
        isMulti={false}
        noOptionsMessage={()=> 'Начните писать'}
        isSearchable
        maxMenuHeight={100}
        //getOptionValue={(option)=> option._id}
        //getOptionLabel={option => option.name}
        isLoading={loading}
        value={value}
        onChange={onChange}
        createOptionPosition='first'
        formatCreateLabel={(inputValue)=>  `Создать нового клиента ${inputValue}`}
        // getNewOptionData={(inputValue) => {
        //   return {value: '123', label: inputValue}
        // }}
        blurInputOnSelect
        controlShouldRenderValue
        unstyled
        //backspaceRemovesValue
        //menuIsOpen
        //loadingMessage={() => 'load'}
        classNames={{
          container: () => styles.wrapper,
          control: (props) => controlClName(props.isFocused),
          menu: () => styles.menu,
          menuList: () => styles.menulist,
          option: () => styles.option
        }}
        />
    </div>
  )
}

export default ClientSelect