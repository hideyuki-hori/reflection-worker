import { Effect } from 'effect'
import type { FindOne } from '~domain/dom'
import { elementNotFound } from './internal'

export const findOne: FindOne = <T extends Element>(selector: string) => {
  const element = document.querySelector<T>(selector)
  return !!element
    ? Effect.succeed(element)
    : elementNotFound(selector)
}