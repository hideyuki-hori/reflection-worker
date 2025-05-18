import { Effect, Exit } from 'effect'
import { describe, it, expect } from 'vitest'
import { makeSyncExitRunner } from './make-sync-exit-runner'
import { unreachable } from '~test-utils/unreachable'

describe('makeSyncExitRunner', () => {
  it('returns Exit.success when Effect succeeds', () => {
    const fx = (x: number) => Effect.succeed(x * 2)
    const run = makeSyncExitRunner(fx)

    const result = run(5)
    expect(Exit.isSuccess(result)).toBe(true)
    if (Exit.isSuccess(result)) {
      expect(result.value).toBe(10)
    } else {
      unreachable()
    }
  })

  it('returns Exit.failure when Effect fails', () => {
    const fx = (s: string) => Effect.fail(new Error(`fail: ${s}`))
    const run = makeSyncExitRunner(fx)

    const result = run('oops')
    expect(Exit.isFailure(result)).toBe(true)
    if (Exit.isFailure(result)) {
      expect(result.cause._tag).toBe('Fail')
    } else {
      unreachable()
    }
  })
})
