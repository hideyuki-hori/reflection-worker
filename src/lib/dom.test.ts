import { Cause, Effect, Exit, pipe } from 'effect'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { findOne, findMany, ElementNotFoundError, create } from './dom'
import { unreachable } from './test-utils'

describe('findOne', () => {
  const container = document.createElement('div')
  const runFindOne = <T extends HTMLElement>(selector: string) => pipe(
    findOne<T>(selector),
    Effect.runSyncExit,
  )
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

  describe('createElement', () => {
    const runCreate = (tag: keyof HTMLElementTagNameMap) => pipe(
      create(tag),
      Effect.runSyncExit,
    )
    it('creates a div element', () => {
      const result = runCreate('div')
      if (Exit.isSuccess(result)) {
        const element = result.value
        expect(element).toBeInstanceOf(HTMLDivElement)
        expect(element.tagName.toLowerCase()).toBe('div')
      } else {
        unreachable()
      }
    })

    it('creates a canvas element', () => {
      const result = runCreate('canvas')
      if (Exit.isSuccess(result)) {
        const element = result.value
        expect(element).toBeInstanceOf(HTMLCanvasElement)
        expect(element.tagName.toLowerCase()).toBe('canvas')
      } else {
        unreachable()
      }
    })

    it('allows setting attributes after creation', () => {
      const result = runCreate('span')
      if (Exit.isSuccess(result)) {
        const element = result.value
        element.setAttribute('data-test', 'ok')
        expect(element.getAttribute('data-test')).toBe('ok')
      } else {
        unreachable()
      }
    })
  })
})
