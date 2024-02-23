export interface INote{
  _id: string;
  year: string;
  day: string;
  month: string;
  time: {
    from: string;
    to: string;
  }
  client: Pick<ICustomer, '_id' | 'name'>
  master: string;
  content: string;
}

type TelegramContact = {
  chatId: number;
  firstName: string;
  username: string;
}

type ClientContacts = {
  telegram?: TelegramContact
  phone?: string
}

export interface ICustomer {
  _id: string;
  name: string;
  contacts: ClientContacts;
  notes: INote[]
}

type AddNoteAction = {
  type: 'add note';
  defaultData: INote
}

type UpdateNoteAction = {
  type: 'update note';
  defaultData: INote
}

export type CustomerData = {
  id: string;
  name: string;
  contacts:{
    telegram: string;
    phone: string
  }
}

type AddCustomerAction = {
  type: 'add customer';
  defaultData: CustomerData;
}

type UpdateCustomerAction = {
  type: 'update customer';
  defaultData: CustomerData;
  onSubmit: (data: ICustomer) => void
}

type ModalAction =
| AddNoteAction
| UpdateNoteAction
| AddCustomerAction
| UpdateCustomerAction

export type ModalProps = {
  handleClose: () => void;
  action: ModalAction
}