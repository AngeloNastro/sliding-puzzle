# 🧩 Puzzle Game - Mobile-First React App

A sliding puzzle game optimized for iPhone and mobile devices, built with React, SCSS, and deployed on GitHub Pages.

## 🎮 Features

- **Touch-Optimized**: Smooth touch interactions for mobile devices
- **Responsive Design**: Works perfectly on iPhone and other mobile devices
- **3x3 Sliding Puzzle**: Classic 8-tile puzzle game
- **Move Counter**: Track your progress
- **Mobile-First**: Designed specifically for mobile gameplay
- **PWA Ready**: Can be installed as a web app on mobile devices

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment to GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
```

Or use the automatic GitHub Actions workflow (push to main branch).

## 📱 Mobile Optimization

- Viewport configured for mobile devices
- Touch event handlers
- Prevents unwanted zooming/scrolling
- Large touch targets (44x44px minimum)
- Visual feedback on interactions
- Optimized for iOS Safari

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool
- **SCSS** - Styling
- **GitHub Pages** - Hosting

## 📝 Game Instructions

1. Tap tiles adjacent to the empty space to move them
2. Arrange numbers in order from 1-8
3. Try to complete in fewest moves possible
4. Tap "New Game" to shuffle and restart

## 🔧 Configuration

The `base` path in `vite.config.js` is set to `/sliding-puzzle/` to match the GitHub repository name.

## 📄 License

MIT
