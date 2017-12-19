export function debounce <T extends Function> (action: T, ms: number): T {
  let timer: number

  return ((...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      action(...args)
    }, ms)
  }) as any
}

export function ensureArray (arr: any) {
  return arr
    ? Array.isArray(arr) ? arr : [arr]
    : []
}
