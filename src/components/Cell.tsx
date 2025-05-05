import React, { Suspense, useState, useCallback } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

interface CellProps {
  x: number
  y: number
  onClick: () => void
  value: 'X' | 'O' | null
}

const Cell: React.FC<CellProps> = ({ x, y, onClick, value }) => {
  const [hovered, setHovered] = useState(false)
  const geometry = new THREE.BoxGeometry(1, 1, 0.1)
  const material = new THREE.MeshStandardMaterial({
    color: hovered ? '#7ddffc' : '#282c34',
    roughness: 0.7,
    metalness: 0.2,
  })

  const xModel = useLoader(GLTFLoader, 'public/models/x.glb')
  const oModel = useLoader(GLTFLoader, 'public/models/o.glb')

  const sanitizedValue = useCallback((): 'X' | 'O' | null => {
    if (value === 'X' || value === 'O') {
      return value
    }
    return null
  }, [value])

  return (
    <mesh
      position={[x, -y, 0]}
      geometry={geometry}
      material={material}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {sanitizedValue() === 'X' && xModel ? (
        <Suspense fallback={null}>
          <primitive object={xModel.scene} scale={0.5} position={[0, 0, 0.6]} />
        </Suspense>
      ) : null}
      {sanitizedValue() === 'O' && oModel ? (
        <Suspense fallback={null}>
          <primitive object={oModel.scene} scale={0.5} position={[0, 0, 0.6]} />
        </Suspense>
      ) : null}
    </mesh>
  )
}

export default Cell