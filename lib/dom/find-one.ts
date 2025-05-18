import { Effect } from 'effect'
import { elementNotFound } from '~domain/element-not-found-error'

export function findOne<T extends Element>(selector: string) {
  const element = document.querySelector<T>(selector)
  return !!element
    ? Effect.succeed(element)
    : elementNotFound(selector)
}