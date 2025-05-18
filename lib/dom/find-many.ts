import { Effect } from 'effect'
import { elementNotFound } from 'models/element-not-found-error'

export function findMany<T extends Element>(selector: string) {
  const elements = document.querySelectorAll<T>(selector)
  return elements.length > 0
    ? Effect.succeed([...elements])
    : elementNotFound(selector)
}
