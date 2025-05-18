import { Effect, pipe } from 'effect'
import type { MakeSyncExitRunner } from '~domain/effect'

export const makeSyncExitRunner: MakeSyncExitRunner = (fn) => {
  return (...args) => pipe(fn(...args), Effect.runSyncExit)
}