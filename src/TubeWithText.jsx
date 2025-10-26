import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function TubeWithText({ config }) {
  const tubeRef = useRef()
  const textGroupRef = useRef()
  const scroll = useScroll()

  // Parse words from config
  const words = useMemo(() => {
    return config.words.split('\n').filter(w => w.trim())
  }, [config.words])

  useFrame(() => {
    if (!tubeRef.current || !textGroupRef.current) return

    const offset = scroll.offset

    // Rotate the entire group (tube + text) around X axis (horizontal rotation)
    const rotation = offset * Math.PI * 4 * config.scrollSpeed
    tubeRef.current.rotation.x = rotation
    textGroupRef.current.rotation.x = rotation
  })

  // Calculate text positions around the cylinder
  const textElements = useMemo(() => {
    const radius = config.tubeRadius
    const totalWords = words.length
    const angleStep = (Math.PI * 2) / totalWords

    return words.map((word, index) => {
      const angle = index * angleStep
      return {
        word,
        angle,
        // Position on cylinder surface
        position: [
          0,
          Math.sin(angle) * radius,
          Math.cos(angle) * radius
        ],
        // Rotation to face outward from cylinder
        rotation: [-angle, 0, 0]
      }
    })
  }, [words, config.tubeRadius])

  return (
    <group>
      {/* The tube/cylinder */}
      <mesh ref={tubeRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[config.tubeRadius, config.tubeRadius, 10, 32, 1, true]} />
        <meshStandardMaterial
          color={config.backgroundColor}
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Text elements positioned on cylinder surface */}
      <group ref={textGroupRef}>
        {textElements.map(({ word, position, rotation }, index) => (
          <Text
            key={index}
            position={position}
            rotation={rotation}
            fontSize={config.fontSize}
            color={config.textColor}
            anchorX="center"
            anchorY="middle"
            letterSpacing={config.letterSpacing}
            maxWidth={8}
            textAlign="center"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {word}
          </Text>
        ))}
      </group>
    </group>
  )
}
