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
      //console.log('no month or year')
      return
    }
    dispatch({type: 'toggleLoading', payload: true})
      ApiController.getNotesByMonth(state.month, state.year)
      .then(data => {
        dispatch({type: 'setNotes', payload:  data})
        dispatch({type: 'toggleLoading', payload: false})
      })
  },[state.month, state.year, dispatch])

  const handleOpenModal = (data: ModalProps['action']) => setModalState(data)

  //console.log('state in App: ', state)

  return (
    <StateContext.Provider value={{state,dispatch}}>
      <AnimatedRoutes handleOpenModal={handleOpenModal} />
        {modalState && createPortal(
          <Modal
          action={modalState}
          handleClose={()=> setModalState(false)}
          />
          , document.body)}
        {state.isLoading && createPortal(
          <Loading/>
        , document.body)}
    </StateContext.Provider>
  )
}

export default App
