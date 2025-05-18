import { Effect, Exit, pipe } from 'effect'

export type MakeSyncExitRunner = <Args extends unknown[], A, E>(
  fn: (...args: Args) => Effect.Effect<A, E>
) => (...args: Args) => Exit.Exit<A, E>

export const makeSyncExitRunner: MakeSyncExitRunner = (fn) => {
  return (...args) => pipe(fn(...args), Effect.runSyncExit)
}