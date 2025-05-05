import { useState, useCallback } from 'react'

type BoardCell = 'X' | 'O' | null

interface UseGameReturn {
  board: BoardCell[][]
  currentPlayer: 'X' | 'O'
  winner: 'X' | 'O' | null
  isGameOver: boolean
  makeMove: (x: number, y: number) => void
  resetGame: () => void
}

const useGame = (): UseGameReturn => {
  const [board, setBoard] = useState<BoardCell[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<'X' | 'O' | null>(null)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const checkWin = useCallback((currentBoard: BoardCell[][]): 'X' | 'O' | null => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[i][0] &&
        currentBoard[i][0] === currentBoard[i][1] &&
        currentBoard[i][0] === currentBoard[i][2]
      ) {
        return currentBoard[i][0]
      }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
      if (
        currentBoard[0][j] &&
        currentBoard[0][j] === currentBoard[1][j] &&
        currentBoard[0][j] === currentBoard[2][j]
      ) {
        return currentBoard[0][j]
      }
    }

    // Check diagonals
    if (
      currentBoard[0][0] &&
      currentBoard[0][0] === currentBoard[1][1] &&
      currentBoard[0][0] === currentBoard[2][2]
    ) {
      return currentBoard[0][0]
    }

    if (
      currentBoard[0][2] &&
      currentBoard[0][2] === currentBoard[1][1] &&
      currentBoard[0][2] === currentBoard[2][0]
    ) {
      return currentBoard[0][2]
    }

    return null
  }, [])

  const checkDraw = useCallback((currentBoard: BoardCell[][]): boolean => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j] === null) {
          return false
        }
      }
    }
    return true
  }, [])

  const makeMove = useCallback(
    (x: number, y: number) => {
      if (isGameOver) {
        console.log('Game is already over')
        return
      }

      if (x < 0 || x >= 3 || y < 0 || y >= 3) {
        console.error('Invalid move coordinates')
        return
      }

      if (board[y][x] !== null) {
        console.error('Invalid move: Cell is not empty')
        return
      }

      const newBoard = board.map((row, i) =>
        i === y ? row.map((cell, j) => (j === x ? currentPlayer : cell)) : row
      )

      const potentialWinner = checkWin(newBoard)
      if (potentialWinner) {
        setBoard(newBoard)
        setWinner(potentialWinner)
        setIsGameOver(true)
        return
      }

      if (checkDraw(newBoard)) {
        setBoard(newBoard)
        setIsGameOver(true)
        return
      }

      setBoard(newBoard)
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    },
    [board, currentPlayer, isGameOver, checkWin, checkDraw]
  )

  const resetGame = useCallback(() => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
    setCurrentPlayer('X')
    setWinner(null)
    setIsGameOver(false)
  }, [])

  return {
    board,
    currentPlayer,
    winner,
    isGameOver,
    makeMove,
    resetGame,
  }
}

export { useGame }