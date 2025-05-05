type BoardCell = 'X' | 'O' | null

const checkWin = (board: BoardCell[][]): 'X' | 'O' | null => {
  if (!Array.isArray(board) || board.length !== 3 || !board.every(row => Array.isArray(row) && row.length === 3)) {
    throw new Error('Invalid board dimensions')
  }

  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return board[i][0]
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] &&
      board[0][j] === board[1][j] &&
      board[0][j] === board[2][j]
    ) {
      return board[0][j]
    }
  }

  // Check diagonals
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return board[0][0]
  }

  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return board[0][2]
  }

  return null
}

const checkDraw = (board: BoardCell[][]): boolean => {
  if (!Array.isArray(board) || board.length !== 3 || !board.every(row => Array.isArray(row) && row.length === 3)) {
    throw new Error('Invalid board dimensions')
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        return false
      }
    }
  }
  return true
}

const isValidMove = (board: BoardCell[][], x: number, y: number): boolean => {
    if (!Array.isArray(board) || board.length !== 3 || !board.every(row => Array.isArray(row) && row.length === 3)) {
    throw new Error('Invalid board dimensions')
  }

  if (x < 0 || x >= 3 || y < 0 || y >= 3) {
    return false
  }

  return board[y][x] === null
}

export { checkWin, checkDraw, isValidMove }