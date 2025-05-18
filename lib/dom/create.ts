import { Effect } from 'effect'

export function create<K extends keyof HTMLElementTagNameMap>(
  tag: K
): Effect.Effect<HTMLElementTagNameMap[K], never> {
  return Effect.sync(() => document.createElement(tag))
}