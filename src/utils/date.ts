import * as stringUtil from './string'

export const tokenRegexp = /Y+|M+|d+|H+|m+|s+|./g

export const defaultDateFormat = 'YYYY-MM-dd'

export const defaultTimeFormat = 'HH:mm:ss'

export const defaultDatetimeFormat = 'YYYY-MM-dd HH:mm:ss'

const parsers = {
  'Y': {
    match: /^(\d{1,4})/,
    unit: 'years'
  },
  'M': {
    match: /^(1[0-2]|0?[1-9])/,
    unit: 'months'
  },
  'd': {
    match: /^(\d{1,2})/,
    unit: 'dates'
  },
  'H': {
    match: /^(2[0-3]|[0-1]?\d)/,
    unit: 'hours'
  },
  'm': {
    match: /^([0-5]?\d)/,
    unit: 'minutes'
  },
  's': {
    match: /^([0-5]?\d)/,
    unit: 'seconds'
  }
}

export type DatetimeType = {
  years?: number
  months?: number
  dates?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export function parse (dirtyString: string, format: string = defaultDatetimeFormat) {
  const tokens = format.match(tokenRegexp) || []
  const tokensLength = tokens.length

  const data: DatetimeType = {}

  for (let i = 0; i < tokensLength; i++) {
    const token = tokens[i]
    const parser = parsers[token[0]]

    const result = parser
      ? parser.match.exec(dirtyString)
      : dirtyString.startsWith(token)

    if (result && result[0]) {
      data[parser.unit] = Number(result[0])
    }

    dirtyString = dirtyString.substring(token.length)
  }

  return data
}

export function stringify (data: DatetimeType = {}, format: string = defaultDatetimeFormat) {
  const {hours = 0, minutes = 0, seconds = 0} = data
  const temp = {'H': hours, 'm': minutes, 's': seconds}

  return format.replace(tokenRegexp, (token) => {
    const value = temp[token[0]]

    return value === undefined
      ? token
      : stringUtil.padStart(value, token.length, '0')
  })
}
