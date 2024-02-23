import type { ICustomer } from "../types";

import React from 'react'

export const initState: ICustomer = {
  _id:'',
  name: '',
  contacts:{},
  notes: []
}

type InitStateAction = {
  type: 'init',
  payload: ICustomer
}

type SetCustomerAction = {
  type: 'setCustomer',
  payload: ICustomer
}


type Action = SetCustomerAction | InitStateAction

export const reducer: React.Reducer<ICustomer, Action> = (state, action) => {
  switch (action.type) {
    case 'init':
        return action.payload
    case 'setCustomer':
        return {...action.payload}
    default:
      return state
  }
}
