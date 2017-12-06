export function create (parent: HTMLElement = document.body) {
  const span = document.createElement('span')
  span.className = 'bui-overlay'
  parent.appendChild(span)

  return span
}

export function remove (element: HTMLElement, parent: HTMLElement = document.body) {
  parent.removeChild(element)
}
