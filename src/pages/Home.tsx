import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Board from '@/components/Board'
import { useGame } from '@/hooks/useGame'
import '@/styles/tailwind.css'

const Home: React.FC = () => {
  const { board } = useGame()

  if (!Array.isArray(board) || board.length !== 3 || !board.every(row => Array.isArray(row) && row.length === 3)) {
    console.error('Invalid boardData:', board)
    return <div>Error: Invalid board data.</div>
  }

  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2.5, 8, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Board boardData={board} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Home