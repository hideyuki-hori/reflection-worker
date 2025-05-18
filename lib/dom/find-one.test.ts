import { Cause, Exit } from 'effect'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ElementNotFoundError } from '~domain/element-not-found-error'
import { makeSyncExitRunner } from '~lib/make-sync-exit-runner'
import { unreachable } from '~test-utils/unreachable'
import { findOne } from './find-one'

describe('findOne', () => {
  const container = document.createElement('div')
  const runFindOne = makeSyncExitRunner(findOne)
  beforeEach(() => {
    container.innerHTML = `<span class="target">ok</span>`
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('succeeds when element exists', () => {
    const result = runFindOne('.target')
    if (Exit.isSuccess(result)) {
      const element = result.value
      expect(element).toBeInstanceOf(HTMLSpanElement)
      expect(element.textContent).toBe('ok')
    } else {
      unreachable()
    }
  })

  it('fails when element does not exist', () => {
    const result = runFindOne('.not-found')
    if (Exit.isFailure(result)) {
      const failure = Cause.failureOrCause(result.cause)
      if (failure._tag === 'Left') {
        const error = failure.left
        expect(error).toBeInstanceOf(ElementNotFoundError)
        expect(error.selector).toBe('.not-found')
      } else {
        unreachable('Expected simple failure, but got a more complex cause')
      }
    } else {
      unreachable()
    }
  })
})
