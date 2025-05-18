import { Cause, Effect, Exit, pipe } from 'effect'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ElementNotFoundError } from 'models/element-not-found-error'
import { unreachable } from 'test-utils/unreachable'
import { findMany } from './find-many'

describe('findMany', () => {
  const container = document.createElement('div')
  const runFindMany = <T extends HTMLElement>(selector: string) => pipe(
    findMany<T>(selector),
    Effect.runSyncExit,
  )
  beforeEach(() => {
    container.innerHTML = `
      <span class="many">1</span>
      <span class="many">2</span>
    `
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('succeeds when elements exist', () => {
    const result = runFindMany('.many')
    if (Exit.isSuccess(result)) {
      const elements = result.value
      expect(elements.length).toBe(2)
      expect(elements.at(0)!.textContent).toBe('1')
      expect(elements.at(1)!.textContent).toBe('2')
    } else {
      unreachable()
    }
  })

  it('fails when no elements are found', () => {
    const result = runFindMany('.none')

    if (Exit.isFailure(result)) {
      const failure = Cause.failureOrCause(result.cause)
      if (failure._tag === 'Left') {
        const error = failure.left
        expect(error).toBeInstanceOf(ElementNotFoundError)
      } else {
        unreachable()
      }
    } else {
      unreachable()
    }
  })
})