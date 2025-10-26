# Text Tube Scroll Effect - React Three Fiber

Эффект прокрутки текста через горизонтальную трубку/туннель, как в видео.

## Особенности

- ✨ Плавная прокрутка текста с вращением
- 🎭 3D эффект туннеля/трубки
- 🎨 Настраиваемые цвета, размеры и текст
- ⚡ Построено на React Three Fiber
- 🎮 Интерактивные контроллеры (Leva GUI)

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Скачайте шрифт для Text3D:
```bash
# Шрифт можно скачать с:
# https://github.com/mrdoob/three.js/blob/dev/examples/fonts/helvetiker_bold.typeface.json
# Положите в папку public/fonts/
```

Или используйте альтернативный подход с `<Text>` компонентом вместо `Text3D` (см. ниже).

3. Запустите dev сервер:
```bash
npm run dev
```

## Использование

Откройте браузер и **прокручивайте колёсиком мыши** - текст будет вращаться и проходить через трубку!

### Контроллеры (правая панель)

- **fontSize** - размер шрифта
- **letterSpacing** - расстояние между буквами
- **scrollSpeed** - скорость прокрутки (количество страниц)
- **tubeRadius** - радиус трубки
- **wordWidthScale** - расстояние между словами
- **textColor** - цвет текста
- **backgroundColor** - цвет фона
- **words** - текст (каждая строка = отдельное слово)

## Альтернатива без Text3D

Если у вас проблемы с загрузкой шрифта для Text3D, замените в `Scene.jsx`:

```jsx
import { Text } from '@react-three/drei'

// Вместо Text3D используйте:
<Text
  fontSize={config.fontSize}
  color={config.textColor}
  anchorX="center"
  anchorY="middle"
  letterSpacing={config.letterSpacing}
>
  {text}
</Text>
```

## Структура проекта

```
treejs/
├── src/
│   ├── App.jsx          # Главный компонент с Canvas
│   ├── Scene.jsx        # Сцена с текстом и эффектами
│   ├── Tube.jsx         # Компонент трубки/туннеля
│   ├── main.jsx         # Точка входа
│   └── index.css        # Стили
├── public/
│   └── fonts/           # Шрифты для Text3D
├── package.json
└── vite.config.js
```

## Как это работает

1. **ScrollControls** от drei создаёт прокручиваемую область
2. При прокрутке текст движется по оси Z и вращается
3. Каждое слово появляется постепенно (staggered reveal)
4. Трубка вращается вместе с прокруткой
5. Opacity и scale анимируются для плавного эффекта

## Технологии

- React 18
- Three.js
- React Three Fiber
- React Three Drei
- Leva (GUI controls)
- Vite

## Build для продакшена

```bash
npm run build
npm run preview
```
