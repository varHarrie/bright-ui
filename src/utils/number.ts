export function clamp (value: number | undefined, min: number, max: number, defaultValue: number = 0) {
  return value === undefined || Number.isNaN(value)
    ? defaultValue
    : value > max
    ? max
    : value < min
    ? min
    : value
}
