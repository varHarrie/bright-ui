export function randomKey () {
  return Math.floor(Math.random() * 1e15).toString(36)
}

export function padStart (original: string | number, targetLength: number, padString: string) {
  original = String(original)

  if (original.length < targetLength) {
    original = padString[0].repeat(targetLength - original.length) + original
  }

  return original
}
