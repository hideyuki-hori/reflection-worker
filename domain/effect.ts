import { Effect, Exit } from 'effect'

export type MakeSyncExitRunner = <Args extends unknown[], A, E>(
  fn: (...args: Args) => Effect.Effect<A, E>
) => (...args: Args) => Exit.Exit<A, E>
