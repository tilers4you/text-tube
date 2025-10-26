import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ExplodingText - Text that can be clicked to explode into particles
 * and auto-restores on scroll movement
 */
export default function ExplodingText({
  text,
  position,
  rotation,
  fontSize,
  color,
  letterSpacing,
  onScrollChange,
  ...props
}) {
  const textRef = useRef()
  const particlesRef = useRef()
  const [isExploded, setIsExploded] = useState(false)
  const [particles, setParticles] = useState([])
  const explosionTime = useRef(0)

  // Create particles when text explodes - dust/smoke effect
  const createParticles = () => {
    const particleCount = 300 // Много мелких частиц для эффекта пыли
    const newParticles = []

    for (let i = 0; i < particleCount; i++) {
      // Случайное направление во все стороны
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const speed = 1 + Math.random() * 4 // Разная скорость

      newParticles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        ),
        velocity: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        ),
        life: 1.0,
        size: 0.01 + Math.random() * 0.03 // Микро-размер частиц
      })
    }

    setParticles(newParticles)
    explosionTime.current = 0
  }

  // Handle click - explode text
  const handleClick = (e) => {
    e.stopPropagation()
    if (!isExploded) {
      setIsExploded(true)
      createParticles()
    }
  }

  // Restore text when scroll changes
  useEffect(() => {
    if (isExploded) {
      setIsExploded(false)
      setParticles([])
    }
  }, [onScrollChange])

  // Animate particles - dust/smoke dispersal
  useFrame((state, delta) => {
    if (isExploded && particles.length > 0) {
      explosionTime.current += delta

      // Update particles with turbulence
      setParticles(prev =>
        prev.map(p => {
          // Добавляем турбулентность для эффекта дыма
          const turbulence = new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5
          )

          return {
            ...p,
            position: p.position.clone().add(
              p.velocity.clone().multiplyScalar(delta)
            ).add(turbulence.multiplyScalar(delta)),
            velocity: p.velocity.clone().multiplyScalar(0.92), // сильное замедление
            life: Math.max(0, p.life - delta * 0.8), // быстрее исчезают
            size: p.size * 1.02 // частицы слегка увеличиваются (эффект расширения дыма)
          }
        }).filter(p => p.life > 0)
      )

      // Auto-restore after 1.5 seconds
      if (explosionTime.current > 1.5) {
        setIsExploded(false)
        setParticles([])
      }
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Original text - hidden when exploded */}
      {!isExploded && (
        <Text
          ref={textRef}
          fontSize={fontSize}
          color={color}
          anchorX="center"
          anchorY="middle"
          letterSpacing={letterSpacing}
          maxWidth={8}
          textAlign="center"
          outlineWidth={0.05}
          outlineColor="#000000"
          onClick={handleClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
          {...props}
        >
          {text}
        </Text>
      )}

      {/* Particles when exploded - tiny dust particles */}
      {isExploded && particles.length > 0 && (
        <group ref={particlesRef}>
          {particles.map((particle, i) => (
            <mesh key={i} position={particle.position}>
              <sphereGeometry args={[particle.size, 4, 4]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={particle.life * 0.7}
                emissive={color}
                emissiveIntensity={particle.life * 0.8}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}
