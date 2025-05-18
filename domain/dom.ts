import { Data, Effect } from 'effect'

export type AppendToBody = (element: HTMLElement) => Effect.Effect<void, never, never>

export type Create = <K extends keyof HTMLElementTagNameMap>(
  tag: K
) => Effect.Effect<HTMLElementTagNameMap[K], never, never>

export type FindOne = <E extends Element = Element>(
  selector: string
) => Effect.Effect<E, ElementNotFoundError, never>

export type FindMany = <E extends Element = Element>(
  selector: string
) => Effect.Effect<E[], ElementNotFoundError, never>

export class ElementNotFoundError extends Data.TaggedError('ElementNotFoundError')<{
  readonly selector: string
}> { }
