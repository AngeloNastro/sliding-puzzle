# 🧩 Sliding Puzzle - Mobile Game

A fast-paced, touch-optimized sliding puzzle game built with React and deployed on GitHub Pages. Solve the classic 8-tile puzzle with smooth swipe gestures and animations.

**Play now:** [https://angelonastro.github.io/sliding-puzzle/](https://angelonastro.github.io/sliding-puzzle/)

## 🎮 Features

- ✨ **Smooth Touch Gestures** - Swipe tiles naturally with visual drag feedback
- 🎨 **Rainbow Design** - Colorful gradient tiles with pastel background
- 📊 **Move Counter** - Track your progress and challenge yourself to beat your score
- ⚡ **Instant Feedback** - Real-time visual response to every interaction
- 📱 **Mobile-First** - Perfectly optimized for iPhone and touch devices
- 🎯 **Classic Gameplay** - Arrange tiles 1-8 in order with one empty space
- 🏆 **Victory Animation** - Celebratory message when you win
- 📲 **PWA Ready** - Add to home screen for app-like experience
- 🎬 **Smooth Animations** - Staggered tile entrance and hover effects

## 🕹️ How to Play

1. **Goal**: Arrange the numbered tiles in order (1-8) with the empty space at bottom-right
2. **Move Tiles**:
   - **Tap** adjacent tiles to slide them into the empty space
   - **Swipe** tiles in the direction they should move
3. **Minimize Moves**: Try to solve the puzzle in the fewest moves possible
4. **New Game**: Click "New Game" button to shuffle and restart

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Dev server runs at `http://localhost:5173/sliding-puzzle/`

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🛠️ Tech Stack

- **React 19** - Modern UI framework with hooks
- **Vite 7** - Lightning-fast build tool with HMR
- **SCSS** - Scoped styling with variables and nesting
- **Touch API** - Native mobile gesture handling
- **gh-pages** - Automatic GitHub Pages deployment
- **CSS Animations** - Smooth, performant animations

## 📁 Project Structure

```
src/
├── components/
│   ├── PuzzleGame.jsx      # Main game logic & state
│   └── PuzzleGame.scss     # Game styling & animations
├── App.jsx                 # Root component
├── App.scss                # App styles
├── main.jsx                # Entry point
└── index.scss              # Global styles

public/
└── icon.svg                # App icon (rainbow puzzle)
```

## 🎨 Design System

- **Colors**: Rainbow gradient for tiles (Red → Orange → Cyan → Pink → Blue → Purple → Teal → Green)
- **Background**: Soft pastel gradient with floating blur effects
- **Typography**: Minimal, clean design with custom spacing
- **Animations**: Staggered entrances, smooth transitions, subtle hover effects

## 📱 Mobile Optimization

- Touch-optimized 90x90px tiles
- Prevents default zoom/scroll behaviors
- Works on iOS Safari, Chrome Mobile, and all modern browsers
- Responsive viewport configuration
- No external dependencies for touch handling

## ⚙️ Configuration

The `base` path in `vite.config.js` is set to `/sliding-puzzle/` to serve correctly from GitHub Pages:

```javascript
export default defineConfig({
  plugins: [react()],
  base: "/sliding-puzzle/",
});
```

Update this if deploying to a different path.

## 🚀 Deployment

### GitHub Pages

```bash
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch.

**Settings required:**

- Go to repository Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` / root folder

### Custom Domain

Update GitHub Pages settings to use your custom domain.

## 📊 Game Logic

- **Grid**: 3x3 with 8 tiles + 1 empty space
- **Shuffle**: 100 random valid moves to ensure solvability
- **Win Condition**: Tiles 1-8 in order with empty space (0) at position 8
- **Valid Moves**: Only tiles adjacent to empty space can move
- **State**: Move counter increments with each tile movement

## 🎯 Performance

- Optimized for 60fps animations
- Minimal re-renders with React hooks
- CSS transforms for hardware acceleration
- Lazy loading with Vite code splitting
- Gzipped bundle: ~62KB (61.97KB gzipped)

## 📄 License

MIT - Feel free to use, modify, and distribute

---

**Made with ❤️ for mobile gaming**
