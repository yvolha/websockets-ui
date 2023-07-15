export function createWsId (): number {
  if (!createWsId.count) {
    createWsId.count = 0;
  }

  return ++createWsId.count;
}