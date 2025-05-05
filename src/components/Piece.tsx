import React, { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface PieceProps {
  type: string | null
}

const Piece: React.FC<PieceProps> = ({ type }) => {
  const xModel = useLoader(GLTFLoader, 'public/models/x.glb')
  const oModel = useLoader(GLTFLoader, 'public/models/o.glb')

  if (type === 'X' && xModel) {
    return (
      <Suspense fallback={null}>
        <primitive object={xModel.scene} scale={0.5} position={[0, 0, 0.6]} />
      </Suspense>
    )
  }

  if (type === 'O' && oModel) {
    return (
      <Suspense fallback={null}>
        <primitive object={oModel.scene} scale={0.5} position={[0, 0, 0.6]} />
      </Suspense>
    )
  }

  return null
}

export default Piece