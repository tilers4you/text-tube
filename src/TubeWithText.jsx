import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ExplodingText from './ExplodingText'

export default function TubeWithText({ config }) {
  const tubeRef = useRef()
  const textGroupRef = useRef()
  const [scrollChange, setScrollChange] = useState(0)
  const totalRotation = useRef(0)
  const velocity = useRef(0)

  // Parse words from config
  const words = useMemo(() => {
    return config.words.split('\n').filter(w => w.trim())
  }, [config.words])

  // Handle infinite wheel scroll
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()

      // Add to velocity based on wheel delta
      const delta = e.deltaY * 0.001 * config.scrollSpeed
      velocity.current += delta

      // Trigger scroll change for exploded text restoration
      setScrollChange(prev => prev + 1)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [config.scrollSpeed])

  useFrame((state, delta) => {
    if (!tubeRef.current || !textGroupRef.current) return

    // Apply velocity to rotation (infinite)
    totalRotation.current += velocity.current * delta * 10

    // Apply friction/damping
    velocity.current *= 0.92

    // Update rotation continuously
    tubeRef.current.rotation.x = totalRotation.current
    textGroupRef.current.rotation.x = totalRotation.current
  })

  // Calculate text positions around the cylinder
  const textElements = useMemo(() => {
    const radius = config.tubeRadius
    const totalWords = words.length

    // Calculate base angle step (full circle divided by number of words)
    const baseAngleStep = (Math.PI * 2) / totalWords

    // Apply wordSpacing uniformly - smaller spacing = words closer together
    const angleStep = baseAngleStep * config.wordSpacing

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
  }, [words, config.tubeRadius, config.wordSpacing])

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

      {/* Exploding text elements positioned on cylinder surface */}
      <group ref={textGroupRef}>
        {textElements.map(({ word, position, rotation }, index) => (
          <ExplodingText
            key={index}
            text={word}
            position={position}
            rotation={rotation}
            fontSize={config.fontSize}
            color={config.textColor}
            letterSpacing={config.letterSpacing}
            onScrollChange={scrollChange}
          />
        ))}
      </group>
    </group>
  )
}
