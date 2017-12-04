export type Value = any

export interface IValueMap {
  [name: string]: Value
}

export interface IValidationMap {
  [name: string]: (value: Value, values: IValueMap) => string | boolean
}

export interface IValidationError {
  name: string,
  message: string
}

export default class FormStore {
  private values: IValueMap = {}
  private defaultValues: IValueMap = {}
  private validations: IValidationMap = {}

  constructor (validations?: IValidationMap) {
    this.validations = validations || {}
  }

  get = (name: string) => {
    return this.values[name]
  }

  getValues = () => {
    return this.values
  }

  set = (name: string, value: Value) => {
    if (name in this.values) {
      const oldValue = this.values[name]

      if (oldValue === value) {
        return
      }

      let newValue = value

      if (Array.isArray(oldValue)) {
        newValue =
          !!oldValue.find((item) => item === newValue)
          ? oldValue.filter((item) => item !== value)
          : [...oldValue, value]
      }

      this.values = {...this.values, [name]: newValue}
    } else {
      this.values[name] = value
      this.defaultValues[name] = value
    }
  }

  validate = (name: string): IValidationError | null => {
    const validation = this.validations[name]
    const value = this.get(name)

    if (validation) {
      const result = validation(value, this.values)

      if (typeof result === 'string' || !result) {
        const message = result || ''
        return {name, message}
      }
    }

    return null
  }

  reset = () => {
    this.values = {...this.defaultValues}
  }
}
