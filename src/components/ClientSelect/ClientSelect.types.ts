import type {SingleValue} from 'react-select'

export type OptionType = {
  value: string;
  label: string;
  __isNew__?: boolean;
} | null

export type ClientSelectProps = {
  value: OptionType | null;
  onChange: (newValue: SingleValue<OptionType>) => void,
  error: boolean
}