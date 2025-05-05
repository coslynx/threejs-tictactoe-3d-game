import { useState, useEffect, useCallback } from 'react'
import { useGame } from '@/hooks/useGame'

interface MultiplayerHookResult {
  isConnected: boolean
  gameState: ('X' | 'O' | null)[][]
  playerTurn: 'X' | 'O' | null
  errorMessage: string | null
  sendMove: (x: number, y: number) => void
  resetMultiplayerGame: () => void
}

type BoardCell = 'X' | 'O' | null

const useMultiplayer = (): MultiplayerHookResult => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [gameState, setGameState] = useState<BoardCell[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [playerTurn, setPlayerTurn] = useState<'X' | 'O' | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const { resetGame: resetLocalGame } = useGame()

  const VITE_WEBSOCKET_URL = String(process.env.VITE_WEBSOCKET_URL)
  const VITE_DEBUG_MODE = process.env.VITE_DEBUG_MODE === 'true'

  const establishConnection = useCallback(() => {
    if (socket) {
      socket.close()
    }

    const ws = new WebSocket(VITE_WEBSOCKET_URL)
    setSocket(ws)

    ws.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)
      setErrorMessage(null)
      if (VITE_DEBUG_MODE) {
        console.log('Debug mode is enabled.')
      }
    }

    ws.onmessage = handleIncomingMessages

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setErrorMessage(`WebSocket error: ${String(error)}`)
      setIsConnected(false)
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      setIsConnected(false)
      setPlayerTurn(null)
      setSocket(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [VITE_WEBSOCKET_URL])

  const handleIncomingMessages = useCallback(
    (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data)

        if (VITE_DEBUG_MODE) {
          console.log('Received message:', message)
        }

        if (message.type === 'gameState') {
          const incomingState = message.state
          if (
            Array.isArray(incomingState) &&
            incomingState.length === 3 &&
            incomingState.every(
              (row) => Array.isArray(row) && row.length === 3
            )
          ) {
            setGameState(incomingState)
          } else {
            console.error('Invalid game state format from server')
            setErrorMessage('Invalid game state format from server')
          }
          setPlayerTurn(message.turn)
        } else {
          console.warn('Unknown message type:', message.type)
        }
      } catch (error: any) {
        console.error('Error parsing message:', error)
        setErrorMessage(`Error parsing message: ${String(error)}`)
      }
    },
    [VITE_DEBUG_MODE]
  )

  const sendMove = useCallback(
    (x: number, y: number) => {
      if (!isConnected || !socket) {
        console.error('Not connected to WebSocket')
        setErrorMessage('Not connected to WebSocket')
        return
      }

      if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || x > 2 || y < 0 || y > 2) {
        console.error('Invalid move coordinates')
        setErrorMessage('Invalid move coordinates')
        return
      }

      try {
        const message = JSON.stringify({ type: 'move', x, y })
        socket.send(message)
        setErrorMessage(null)
      } catch (error: any) {
        console.error('Error sending move:', error)
        setErrorMessage(`Error sending move: ${String(error)}`)
      }
    },
    [isConnected, socket]
  )

  const resetMultiplayerGame = useCallback(() => {
    if (!isConnected || !socket) {
      console.error('Not connected to WebSocket')
      setErrorMessage('Not connected to WebSocket')
      return
    }

    try {
      const message = JSON.stringify({ type: 'reset' })
      socket.send(message)
      setErrorMessage(null)
      resetLocalGame()
      setGameState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
    } catch (error: any) {
      console.error('Error sending reset:', error)
      setErrorMessage(`Error sending reset: ${String(error)}`)
    }
  }, [isConnected, socket, resetLocalGame])

  const closeConnection = useCallback(() => {
    if (socket) {
      socket.close()
      setIsConnected(false)
      setSocket(null)
    }
  }, [socket])

  useEffect(() => {
    establishConnection()

    return () => {
      closeConnection()
    }
  }, [establishConnection, closeConnection])

  return {
    isConnected,
    gameState,
    playerTurn,
    errorMessage,
    sendMove,
    resetMultiplayerGame,
  }
}

export { useMultiplayer }