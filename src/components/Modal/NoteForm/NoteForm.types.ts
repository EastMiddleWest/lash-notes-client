import type { INote } from "../../../types";
import type {OptionType} from '../../ClientSelect/ClientSelect'

export type NoteFormProps = {
  type: 'add note' | 'update note';
  handleClose: () => void;
  defaultData: INote;
}

export type Inputs = {
  time: {
    from: string;
    to: string;
  }
  date:{
    day: string;
    month: string;
    year: string;
  },
  master: string;
  client: OptionType;
  content: string;
}
