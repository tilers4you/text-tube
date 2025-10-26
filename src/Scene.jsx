import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Text, Center } from '@react-three/drei'
import * as THREE from 'three'
import Tube from './Tube'

export default function Scene({ config }) {
  const scroll = useScroll()
  const groupRef = useRef()

  // Parse words from config
  const words = config.words.split('\n').filter(w => w.trim())

  useFrame(() => {
    if (!groupRef.current) return

    // Get scroll offset (0 to 1)
    const offset = scroll.offset

    // Move the group along Z axis based on scroll
    groupRef.current.position.z = offset * config.scrollSpeed * 10

    // Rotate the group slightly for tube effect
    groupRef.current.rotation.z = offset * Math.PI * 2
  })

  return (
    <>
      {/* Tube/Tunnel effect */}
      <Tube config={config} />

      {/* Text elements */}
      <group ref={groupRef}>
        {words.map((word, index) => (
          <TextWord
            key={index}
            text={word}
            position={[0, 0, -index * config.wordWidthScale * 3]}
            config={config}
            index={index}
          />
        ))}
      </group>
    </>
  )
}

function TextWord({ text, position, config, index }) {
  const meshRef = useRef()
  const scroll = useScroll()

  useFrame(() => {
    if (!meshRef.current) return

    const offset = scroll.offset
    const totalWords = config.words.split('\n').filter(w => w.trim()).length

    // Calculate when this word should be visible (staggered reveal)
    const startReveal = index / totalWords
    const endReveal = (index + 1) / totalWords

    // Opacity fade based on scroll position
    const opacity = THREE.MathUtils.clamp(
      THREE.MathUtils.smoothstep(offset, startReveal - 0.1, endReveal + 0.1),
      0,
      1
    )

    if (meshRef.current.material) {
      meshRef.current.material.opacity = opacity
    }

    // Rotation effect as words scroll through
    const rotationProgress = (offset - startReveal) * totalWords
    meshRef.current.rotation.x = rotationProgress * Math.PI * 0.5
    meshRef.current.rotation.y = Math.sin(rotationProgress * Math.PI) * 0.3

    // Scale effect
    const scale = 1 + Math.sin(rotationProgress * Math.PI) * 0.2
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <group position={position}>
      <Text
        ref={meshRef}
        fontSize={config.fontSize}
        color={config.textColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={config.letterSpacing}
        maxWidth={20}
        textAlign="center"
      >
        {text}
        <meshStandardMaterial
          color={config.textColor}
          transparent={true}
          opacity={1}
          emissive={config.textColor}
          emissiveIntensity={0.2}
        />
      </Text>
    </group>
  )
}
