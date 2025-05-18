import { Effect, Exit, pipe } from 'effect'

export function makeSyncExitRunner<Args extends unknown[], A, E>(
  fn: (...args: Args) => Effect.Effect<A, E>
): (...args: Args) => Exit.Exit<A, E> {
  return (...args) => pipe(fn(...args), Effect.runSyncExit)
}