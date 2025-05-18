import { Effect } from 'effect'
import type { AppendToBody } from '~domain/dom'

export const appendToBody: AppendToBody = (element: HTMLElement) => {
  return Effect.sync(() => {
    document.body.appendChild(element)
  })
}
