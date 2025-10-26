import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function Tube({ config }) {
  const tubeRef = useRef()
  const scroll = useScroll()

  // Create curved path for the tube
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, -5),
    new THREE.Vector3(0, -1, -10),
    new THREE.Vector3(0, 0.5, -15),
    new THREE.Vector3(0, 0, -20),
    new THREE.Vector3(0, -0.5, -25),
    new THREE.Vector3(0, 0, -30),
    new THREE.Vector3(0, 1, -35),
    new THREE.Vector3(0, 0, -40),
  ])

  useFrame(() => {
    if (!tubeRef.current) return

    const offset = scroll.offset

    // Animate tube rotation
    tubeRef.current.rotation.z = offset * Math.PI * 4

    // Update opacity based on scroll
    tubeRef.current.material.opacity = 0.15 + offset * 0.2
  })

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[path, 100, config.tubeRadius, 32, false]} />
      <meshStandardMaterial
        color={config.textColor}
        transparent
        opacity={0.15}
        side={THREE.BackSide}
        wireframe
      />
    </mesh>
  )
}
