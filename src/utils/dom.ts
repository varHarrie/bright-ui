export function getStyle (dom: Element, attr: string) {
  const currentStyle = (dom as any).currentStyle
  return currentStyle ? currentStyle[attr] : getComputedStyle(dom)[attr]
}
