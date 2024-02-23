import React from 'react'
import {createPortal} from 'react-dom'

import {DataState, Action, reducer, initState} from './utilities/state.ts'
import ApiController from './controllers/apiController.ts'

import Modal from './components/Modal/Modal.tsx'
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes.tsx'
import Loading from './components/Loading/Loading.tsx'

import type { ModalProps } from './types.ts'

export const StateContext = React.createContext<{
  state: DataState;
  dispatch: React.Dispatch<Action>
}>(null!)

function App() {

  const [state, dispatch] = React.useReducer(reducer, initState)
  const [modalState, setModalState] = React.useState<ModalProps['action'] | false>(false)


  React.useEffect(()=>{
    if(!state.month || !state.year) {
      return
    }
    dispatch({type: 'toggleLoadingState', payload: true})
      ApiController.getNotesByMonth(state.month, state.year)
      .then(data => {
        dispatch({type: 'setNotes', payload:  data})
        dispatch({type: 'toggleLoadingResult', payload: 'succes'})
        //dispatch({type: 'toggleLoadingState', payload: false})
      })
      .catch(()=>dispatch({type: 'toggleLoadingResult', payload: 'error'}))
      //.finally(()=> dispatch({type: 'toggleLoadingState', payload: false}))
  },[state.month, state.year, dispatch])

  const handleOpenModal = (data: ModalProps['action']) => setModalState(data)

  //console.log('state in App: ', state.isLoading)


  return (
    <StateContext.Provider value={{state,dispatch}}>
      <AnimatedRoutes handleOpenModal={handleOpenModal} />
        {modalState && createPortal(
          <Modal
          action={modalState}
          handleClose={()=> setModalState(false)}
          />
          , document.body)}
        {state.isLoading.state && createPortal(
          <Loading/>
        , document.body)}
    </StateContext.Provider>
  )
}

// {type:'add note', defaultData:
//   {_id:'', client:{_id:'', name:''}, day:'', master: 'Катя', month: '', year:'', content:'', time:{from:'', to:''}}
// }

export default App
