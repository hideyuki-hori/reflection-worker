import { Effect } from 'effect'
import { ElementNotFoundError } from '~domain/dom'

export function elementNotFound(selector: string) {
  const error = new ElementNotFoundError({ selector })
  return Effect.fail(error)
}
