# 3D Rotating Text Cylinder with Particle Explosion

An interactive 3D text visualization built with React Three Fiber. Features text wrapped around a rotating cylinder with click-to-explode particle effects and infinite scroll.

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)

## Features

- 🎡 **Infinite Scroll** - Rotate the cylinder endlessly with mouse wheel
- 💥 **Particle Explosions** - Click on any word to see it explode into dust particles
- 🎨 **Customizable** - Full GUI controls for colors, spacing, speed, and more
- ✨ **Smooth Animations** - Inertia-based rotation with smooth deceleration
- 🌙 **Dark Theme** - Black background with white text by default
- 📱 **Responsive** - Works on different screen sizes

## Demo

Scroll with your mouse wheel to rotate the text cylinder. Click on any word to make it explode into particles. The word will restore when you scroll again.

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd treejs

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. **Scroll** - Use mouse wheel to rotate the cylinder infinitely
2. **Click** - Click on any word to create a particle explosion effect
3. **Customize** - Open the Leva GUI panel (top-right) to adjust settings

## Configuration

The Leva GUI panel provides real-time controls:

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| fontSize | 0.7 | 0.3 - 3.0 | Size of the text |
| letterSpacing | 0.01 | -0.1 - 0.5 | Space between letters |
| wordSpacing | 0.4 | 0.2 - 3.0 | Distance between words around cylinder |
| scrollSpeed | 1.0 | 0.5 - 5.0 | Rotation speed multiplier |
| tubeRadius | 3.0 | 2.0 - 10.0 | Radius of the cylinder |
| textColor | #ffffff | Color | Text color |
| backgroundColor | #000000 | Color | Background color |
| words | Custom | Text | Words to display (one per line) |

## Technology Stack

- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Leva** - GUI controls
- **Vite** - Build tool and dev server

## Project Structure

```
treejs/
├── src/
│   ├── AppTube.jsx           # Main app component with Canvas setup
│   ├── TubeWithText.jsx      # Cylinder with text positioning logic
│   ├── ExplodingText.jsx     # Text component with particle explosion
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## How It Works

### Infinite Scroll
The cylinder uses direct mouse wheel events instead of bounded scroll controls, allowing continuous rotation without limits. Velocity is accumulated and smoothly dampened for natural physics.

### Particle Explosion
When text is clicked:
1. Text disappears and spawns 300 tiny particles
2. Particles explode outward in all directions with randomized velocities
3. Turbulence is applied for a smoke/dust effect
4. Particles fade out and expand slightly
5. Scrolling restores the original text

### Text Positioning
Text elements are positioned around the cylinder's circumference using trigonometric calculations:
- Each word is placed at an angle based on `wordSpacing`
- Position: `[0, sin(angle) * radius, cos(angle) * radius]`
- Rotation ensures text faces outward from cylinder

## Customization

### Changing Default Text

Edit the `words` config in `src/AppTube.jsx`:

```javascript
words: {
  value: 'YOUR\nCUSTOM\nTEXT\nHERE',
  rows: 4
}
```

### Adjusting Particle Effects

Modify `src/ExplodingText.jsx`:

```javascript
const particleCount = 300  // Number of particles
const speed = 1 + Math.random() * 4  // Explosion speed
```

## Performance

- Uses efficient particle rendering with geometry instancing
- Optimized for 60 FPS on modern devices
- Particle count can be adjusted for lower-end devices

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Requires WebGL support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- GUI powered by [Leva](https://github.com/pmndrs/leva)
- Inspired by creative 3D text effects

---

Made with ❤️ using React and Three.js
