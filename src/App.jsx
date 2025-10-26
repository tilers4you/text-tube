import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { useControls } from 'leva'
import Scene from './Scene'
import './App.css'

function App() {
  const config = useControls({
    fontSize: { value: 2, min: 0.5, max: 5, step: 0.1 },
    letterSpacing: { value: 0.15, min: 0, max: 1, step: 0.01 },
    scrollSpeed: { value: 4, min: 1, max: 10, step: 0.5 },
    tubeRadius: { value: 3, min: 1, max: 8, step: 0.5 },
    wordWidthScale: { value: 1.2, min: 0.5, max: 3, step: 0.1 },
    textColor: '#ffffff',
    backgroundColor: '#2d7a4f',
    words: {
      value: 'WE\nLOVE\nTO MAKE\nNEXT-GEN\nIDEAS',
      rows: 5
    }
  })

  return (
    <div style={{ width: '100vw', height: '100vh', background: config.backgroundColor }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }}>
        <color attach="background" args={[config.backgroundColor]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <ScrollControls pages={config.scrollSpeed} damping={0.1} distance={1}>
          <Scene config={config} />
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
