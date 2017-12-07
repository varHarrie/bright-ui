import * as stringUtil from './string'

export const tokenRegexp = /Y+|M+|D+|H+|m+|s+|./g

export const defaultDateFormat = 'YYYY-MM-DD'

export const defaultTimeFormat = 'HH:mm:ss'

export const defaultDatetimeFormat = 'YYYY-MM-DD HH:mm:ss'

const parsers = {
  'Y': {
    match: /^(\d{1,4})/,
    unit: 'years'
  },
  'M': {
    match: /^(1[0-2]|0?[1-9])/,
    unit: 'months'
  },
  'D': {
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

const defaultAttrs = {years: true, months: true, dates: true}

export function parseFromDate (date: Date, attrs: {[name: string]: boolean} = defaultAttrs) {
  return {
    years: date.getFullYear(),
    months: date.getMonth() + 1,
    dates: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
}

export function parse (dirtyString: string, format: string = defaultDatetimeFormat) {
  const data: DatetimeType = {}

  const tokens = format.match(tokenRegexp) || []
  const tokensLength = tokens.length

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

export function stringify (data: Date | DatetimeType = {}, format: string = defaultDatetimeFormat) {
  const details = data instanceof Date ? parseFromDate(data) : data

  return format.replace(tokenRegexp, (token) => {
    const value = parsers[token[0]] && details[parsers[token[0]].unit]

    return value === undefined
      ? token
      : stringUtil.padStart(value, token.length, '0')
  })
}

export function toDate (data: DatetimeType) {
  const date = new Date()

  if (data.years !== undefined) date.setFullYear(data.years)
  if (data.months !== undefined) date.setMonth(data.months - 1)
  if (data.dates !== undefined) date.setDate(data.dates)

  if (data.hours !== undefined) date.setHours(data.hours)
  if (data.minutes !== undefined) date.setMinutes(data.minutes)
  if (data.seconds !== undefined) date.setSeconds(data.seconds)

  return date
}

export function copyOrCreate (date: Date | null | undefined, defaultOptions?: DatetimeType) {
  return date ? new Date(date) : toDate(defaultOptions || {})
}
