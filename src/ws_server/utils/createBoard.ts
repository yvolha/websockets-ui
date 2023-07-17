export const createBoard = (userId: number, gameId: number) => {
  const board: Array<Array<number>> = Array(5).fill(0).map(()=>Array(5).fill(0));
  return {
    userId,
    gameId,
    board,
  }
}
