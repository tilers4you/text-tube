import { Canvas } from '@react-three/fiber'
import { Text, ScrollControls, useScroll } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function ScrollingText() {
  const scroll = useScroll()
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = scroll.offset * 20
      groupRef.current.rotation.z = scroll.offset * Math.PI
    }
  })

  return (
    <group ref={groupRef}>
      <Text position={[0, 0, 0]} fontSize={2} color="white">
        WE
      </Text>
      <Text position={[0, 0, -3]} fontSize={2} color="white">
        LOVE
      </Text>
      <Text position={[0, 0, -6]} fontSize={2} color="white">
        TO MAKE
      </Text>
      <Text position={[0, 0, -9]} fontSize={2} color="white">
        NEXT-GEN
      </Text>
      <Text position={[0, 0, -12]} fontSize={2} color="white">
        IDEAS
      </Text>
    </group>
  )
}

export default function AppSimple() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#2d7a4f']} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />

        <ScrollControls pages={3} damping={0.1}>
          <ScrollingText />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
