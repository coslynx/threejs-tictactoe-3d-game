import React, { Suspense, useCallback, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { useGame } from '@/hooks/useGame'

interface CellProps {
  x: number
  y: number
  onClick: () => void
  value: string | null
}

interface BoardProps {
  boardData: (string | null)[][]
}

const Board: React.FC<BoardProps> = ({ boardData }) => {
  const { makeMove } = useGame()
  const [error, setError] = useState<string | null>(null)

  const xModel = useLoader(GLTFLoader, 'public/models/x.glb')
  const oModel = useLoader(GLTFLoader, 'public/models/o.glb')

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      try {
        if (!boardData) {
          throw new Error('Board data is invalid or missing.')
        }

        if (x < 0 || x >= 3 || y < 0 || y >= 3) {
          throw new Error('Invalid cell coordinates.')
        }

        makeMove(x, y)
      } catch (e: any) {
        setError(e.message || 'An unexpected error occurred.')
        console.error('Error handling cell click:', e)
      }
    },
    [makeMove, boardData]
  )

  const Cell: React.FC<CellProps> = ({ x, y, onClick, value }) => {
    const [hovered, setHovered] = useState(false)
    const geometry = new THREE.BoxGeometry(1, 1, 0.1)
    const material = new THREE.MeshStandardMaterial({
      color: hovered ? '#7ddffc' : '#282c34',
      roughness: 0.7,
      metalness: 0.2,
    })

    return (
      <mesh
        position={[x, -y, 0]}
        geometry={geometry}
        material={material}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {value === 'X' && xModel ? (
          <Suspense fallback={null}>
            <primitive
              object={xModel.scene}
              scale={0.5}
              position={[0, 0, 0.6]}
            />
          </Suspense>
        ) : null}
        {value === 'O' && oModel ? (
          <Suspense fallback={null}>
            <primitive
              object={oModel.scene}
              scale={0.5}
              position={[0, 0, 0.6]}
            />
          </Suspense>
        ) : null}
      </mesh>
    )
  }

  if (!Array.isArray(boardData) || boardData.length !== 3 || !boardData.every(row => Array.isArray(row) && row.length === 3)) {
    console.error('Invalid boardData:', boardData)
    return <div>Error: Invalid board data.</div>
  }

  return (
    <>
      {error && (
        <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-4">
          {error}
        </div>
      )}
      <group>
        {boardData.map((row, y) =>
          row.map((value, x) => (
            <Cell
              key={`${x}-${y}`}
              x={x}
              y={y}
              value={value}
              onClick={() => handleCellClick(x, y)}
            />
          ))
        )}
      </group>
    </>
  )
}

export default Board