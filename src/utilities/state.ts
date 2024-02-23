import type {INote} from '../types'


export type DataState = {
  isLoading: {
    state: boolean;
    result: 'succes' | 'error' | undefined
  };
  year: string;
  month: string;
  days: Record<string,INote[]>;
}

type ToggleLoadingStateAction = {
  type: 'toggleLoadingState',
  payload: boolean
}

type ToggleLoadingResultAction = {
  type: 'toggleLoadingResult',
  payload: 'succes' | 'error'
}

type SetNotesAction = {
  type: 'setNotes',
  payload: INote[]
}

type SetDateAction = {
  type: 'setDate';
  payload: {
    year: string;
    month: string;
  }
}

type AddNoteAction = {
  type: 'addNote',
  payload: INote
}

type UpdateNoteAction = {
  type: 'updateNote',
  payload: INote
}

type DeleteNoteAction = {
  type: 'deleteNote',
  payload: string
}

export type Action =
| ToggleLoadingStateAction
| ToggleLoadingResultAction
| SetDateAction
| SetNotesAction
| AddNoteAction
| UpdateNoteAction
| DeleteNoteAction

// const today = new Date()
// const currentMonth = String(today.getMonth()+1)
// const currentYear = String(today.getFullYear())

// export const initState: DataState = {
//   isLoading: false,
//   year: currentYear,
//   month: currentMonth,
//   days: {}
// }

export const initState: DataState = {
  isLoading: {
    state: false,
    result: undefined
  },
  year: '',
  month: '',
  days: {}
}

const generateMonthData = (payload: INote[]): DataState['days'] => {
  const days: DataState['days'] = {}
  payload.forEach(el => {
    if(!days[el.day]) days[el.day] = []
    days[el.day].push(el)
  })
  return days
}

export const reducer: React.Reducer<DataState, Action> = (state, action) => {
  switch (action.type) {
    case 'toggleLoadingState':{
      return {...state, isLoading: {state:action.payload, result: undefined}}
    }
    case 'toggleLoadingResult':{
      return {...state, isLoading: {state:state.isLoading.state, result: action.payload}}
    }
    case 'setNotes':{
      return {
        ...state,
        days: generateMonthData(action.payload)
      }
    }
    case 'setDate':{
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
      }
    }
    case 'addNote':{
      if(action.payload.year === state.year && String(+action.payload.month) === state.month) {
        if(!state.days[action.payload.day]){
          state.days[action.payload.day] = []
        }
        const dayNotes = [...state.days[action.payload.day]]
        dayNotes.push(action.payload)
        const daysCopy = {...state.days}
        daysCopy[action.payload.day] = dayNotes
        return {...state, days: daysCopy}
      }
      else return state
    }
    case 'updateNote':{
      if(action.payload.year === state.year && String(+action.payload.month) === state.month){
        const daysCopy = {...state.days}
        for (const [key, values] of Object.entries(daysCopy)) {
          daysCopy[key] = values.filter(note => note._id !== action.payload._id)
        }
        daysCopy[action.payload.day].push(action.payload)
        return {...state, days: daysCopy}
      }
      else return state
    }
    case 'deleteNote':{
      const daysCopy = {...state.days}
      for (const [key, values] of Object.entries(daysCopy)) {
        daysCopy[key] = values.filter(note => note._id !== action.payload)
      }
      return {...state, days: daysCopy}
    }
    default:
      return state
  }
}