import * as React from 'react'

export interface ISelectOption {
  label: string
  value: any
}

export interface ISelectOptionProps extends ISelectOption {}

export interface ISelectOptionState {}

export default class SelectOption extends React.Component<ISelectOptionProps, ISelectOptionState> {

  render () {
    return null
  }
}
