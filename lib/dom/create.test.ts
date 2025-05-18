import { Exit } from 'effect'
import { describe, it, expect } from 'vitest'
import { makeSyncExitRunner } from '~lib/make-sync-exit-runner'
import { unreachable } from '~test-utils/unreachable'
import { create } from './create'

describe('createElement', () => {
  const runCreate = makeSyncExitRunner(create)
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
