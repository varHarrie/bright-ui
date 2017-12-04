export function debounce <T extends Function> (action: T, ms: number): T {
  let timer: number

  return ((...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      action(...args)
    }, ms)
  }) as any
}

export function randomKey () {
  return Math.floor(Math.random() * 1e15).toString(36)
}

export function getStyle (dom: Element, attr: string) {
  const currentStyle = (dom as any).currentStyle
  return currentStyle ? currentStyle[attr] : getComputedStyle(dom)[attr]
}
