import { Effect } from 'effect'
import type { FindMany } from '~domain/dom'
import { elementNotFound } from './internal'

export const findMany: FindMany = <E extends Element = Element>(selector: string) => {
  const elements = document.querySelectorAll<E>(selector)
  return elements.length > 0
    ? Effect.succeed([...elements])
    : elementNotFound(selector)
}