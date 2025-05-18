import { Effect } from 'effect'
import type { Create } from '~domain/dom'

export const create: Create = tag => {
  return Effect.sync(() => document.createElement(tag))
}