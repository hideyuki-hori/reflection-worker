export function unreachable(message: string = 'Unreachable code reached') {
  throw new Error(message)
}
