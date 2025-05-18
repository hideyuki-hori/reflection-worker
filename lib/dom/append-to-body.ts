import { Effect } from 'effect'

export function appendToBody(element: HTMLElement): Effect.Effect<void> {
  return Effect.sync(() => {
    document.body.appendChild(element)
  })
}
