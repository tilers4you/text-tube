import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import TubeWithText from './TubeWithText'

export default function AppTube() {
  const config = useControls({
    fontSize: { value: 0.7, min: 0.3, max: 3, step: 0.1 },
    letterSpacing: { value: 0.01, min: -0.1, max: 0.5, step: 0.01 },
    wordSpacing: { value: 0.4, min: 0.2, max: 3, step: 0.1, label: 'Word Spacing (расстояние между словами)' },
    scrollSpeed: { value: 1.0, min: 0.5, max: 5, step: 0.5 },
    tubeRadius: { value: 3.0, min: 2, max: 10, step: 0.5 },
    textColor: '#ffffff',
    backgroundColor: '#000000',
    words: {
      value: 'WE\nLOVE\nTO MAKE\nNEXT-GEN\nIDEAS',
      rows: 5
    },
    showWireframe: false,
    enableOrbitControls: false
  })

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000000' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[config.backgroundColor]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight
          position={[0, 0, 20]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Optional orbit controls for debugging */}
        {config.enableOrbitControls && <OrbitControls />}

        {/* Tube with infinite scroll */}
        <TubeWithText config={config} />
      </Canvas>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        textAlign: 'center',
        fontSize: '14px',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px 20px',
        borderRadius: '8px',
        pointerEvents: 'none'
      }}>
        Прокрутите колёсиком мыши, чтобы вращать трубу ↕️
      </div>
    </div>
  )
}
