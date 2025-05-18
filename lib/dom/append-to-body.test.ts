import { Exit } from 'effect'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { makeSyncExitRunner } from '~lib/make-sync-exit-runner'
import { unreachable } from '~test-utils/unreachable'
import { appendToBody } from './append-to-body'

describe('appendToBody', () => {
  const runAppend = makeSyncExitRunner(appendToBody)

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('appends element to body', () => {
    const div = document.createElement('div')
    const result = runAppend(div)

    if (Exit.isSuccess(result)) {
      expect(document.body.contains(div)).toBe(true)
    } else {
      unreachable()
    }
  })
})
