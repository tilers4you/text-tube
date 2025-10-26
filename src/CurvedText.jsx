import { Text } from '@react-three/drei'
import { useMemo } from 'react'

/**
 * CurvedText - renders text where each character is positioned
 * individually to wrap around a cylinder surface
 */
export default function CurvedText({
  text,
  radius,
  fontSize,
  color,
  letterSpacing,
  startAngle = 0,
  ...props
}) {
  const letters = useMemo(() => {
    const chars = text.split('')
    const totalChars = chars.length

    // Calculate angle per character based on font size and letter spacing
    const charWidth = fontSize * 0.6 // Approximate character width
    const spacing = fontSize * letterSpacing
    const totalWidth = (charWidth + spacing) * totalChars
    const arcLength = totalWidth
    const anglePerChar = arcLength / radius // Angle in radians per character

    return chars.map((char, index) => {
      // Calculate angle for this character (for vertical cylinder)
      const angle = startAngle + (index - totalChars / 2) * anglePerChar

      // Position on cylinder surface (vertical cylinder - rotate around Y axis)
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius

      // Rotation to face outward from cylinder and align with surface
      const rotation = [0, -angle, 0]

      return {
        char,
        position: [x, 0, z],
        rotation,
        angle
      }
    })
  }, [text, radius, fontSize, letterSpacing, startAngle])

  return (
    <group {...props}>
      {letters.map((letter, index) => (
        <Text
          key={index}
          position={letter.position}
          rotation={letter.rotation}
          fontSize={fontSize}
          color={color}
          anchorX="center"
          anchorY="middle"
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?.-, "
        >
          {letter.char}
        </Text>
      ))}
    </group>
  )
}
