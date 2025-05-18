import { Data, Effect } from 'effect'

export class ElementNotFoundError extends Data.TaggedError('ElementNotFoundError')<{
  readonly selector: string
}> { }

export function elementNotFound(selector: string) {
  const error = new ElementNotFoundError({ selector })
  return Effect.fail(error)
}
