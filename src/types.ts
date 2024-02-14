export interface INote{
  _id: string;
  year: string;
  day: string;
  month: string;
  time: {
    from: string;
    to: string;
  }
  master: string;
  content: string;
}

export interface ICustomer {
  _id: string;
  name: string;
  content: string;
}

type AddNoteAction = {
  type: 'add note';
  defaultData: INote
}

type UpdateNoteAction = {
  type: 'update note';
  defaultData: INote
}

type AddCustomerAction = {
  type: 'add customer';
  defaultData: ICustomer
}

type UpdateCustomerAction = {
  type: 'update customer';
  defaultData: ICustomer
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