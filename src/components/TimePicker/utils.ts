const tokenRegexp = /H+|m+|s+|./g

const defaultFormat = 'HH:mm:ss'

const parsers = {
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

export function padStart (original: string | number, targetLength: number) {
  original = String(original)

  if (original.length < targetLength) {
    original = '0'.repeat(targetLength - original.length) + original
  }

  return original
}

export type TimeDataType = {hours?: number, minutes?: number, seconds?: number}

export function parse (dirtyString: string, format: string = defaultFormat) {
  const tokens = format.match(tokenRegexp) || []
  const tokensLength = tokens.length

  const data: TimeDataType = {}

  for (let i = 0; i < tokensLength; i++) {
    const token = tokens[i]
    const parser = parsers[token[0]]

    const result = parser
      ? parser.match.exec(dirtyString)
      : dirtyString.startsWith(token)

    if (!result) {
      return null
    } else if (result[0]) {
      data[parser.unit] = result[0]
    }

    dirtyString = dirtyString.substring(token.length)
  }

  return data
}

export function stringify (data: TimeDataType = {}, format: string = defaultFormat) {
  const {hours = 0, minutes = 0, seconds = 0} = data
  const temp = {'H': hours, 'm': minutes, 's': seconds}

  return format.replace(tokenRegexp, (token) => {
    const value = temp[token[0]]

    return value === undefined
      ? token
      : padStart(value, token.length)
  })
}
