import { Data, Effect } from 'effect'

export class ElementNotFoundError extends Data.TaggedError('ElementNotFoundError')<{
  readonly selector: string
}> { }

export function create<K extends keyof HTMLElementTagNameMap>(tag: K) {
  return Effect.succeed(document.createElement(tag))
}

export function findOne<T extends Element>(selector: string) {
  const element = document.querySelector<T>(selector)
  return !!element
    ? Effect.succeed(element)
    : toFail(selector)
}

export function findMany<T extends Element>(selector: string) {
  const elements = document.querySelectorAll<T>(selector)
  return elements.length > 0
    ? Effect.succeed([...elements])
    : toFail(selector)
}

function toFail(selector: string) {
  const error = new ElementNotFoundError({ selector })
  return Effect.fail(error)
}
