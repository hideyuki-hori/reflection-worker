import { describe, it, expect } from 'vitest'
import { Exit, Effect, pipe } from 'effect'
import type { ElementNotFoundError } from '~domain/dom'
import { appendToBody } from '~infrastructure/dom/append-to-body'
import { create } from '~infrastructure/dom/create'
import { findOne } from '~infrastructure/dom/find-one'
import { findMany } from '~infrastructure/dom/find-many'
import { makeSyncExitRunner } from '~infrastructure/effect/make-sync-exit-runner'
import { unreachable } from '~test-utils/unreachable'

describe('dom integration flow', () => {
  const domFlow = (
    tag: keyof HTMLElementTagNameMap,
    className: string
  ): Effect.Effect<HTMLElement, ElementNotFoundError, never> => pipe(
    create(tag),
    Effect.tap((el) => Effect.sync(() => el.classList.add(className))),
    Effect.tap(appendToBody),
    Effect.flatMap(() => findOne<HTMLElement>(`.${className}`))
  )
  const runDomFlow = makeSyncExitRunner(domFlow)

  it('creates, appends, and finds a single element', () => {
    const result = runDomFlow('span', 'test-class')

    if (Exit.isSuccess(result)) {
      const element = result.value
      expect(element).toBeInstanceOf(HTMLElement)
      expect(element.classList.contains('test-class')).toBe(true)
    } else {
      unreachable()
    }
  })

  it('creates multiple elements and finds many', () => {
    const tags = ['div', 'div'] as const
    const className = 'multi-class'

    tags.forEach((tag) => {
      const result = runDomFlow(tag, className)
      if (Exit.isFailure(result)) unreachable()
    })

    const result = pipe(findMany(`.${className}`), Effect.runSyncExit)
    if (Exit.isSuccess(result)) {
      expect(result.value.length).toBe(tags.length)
    } else {
      unreachable()
    }
  })
})
