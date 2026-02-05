import { useState, useEffect } from 'react';
import './PuzzleGame.scss';

const GRID_SIZE = 3; // 3x3 puzzle (8 tiles + 1 empty)

// Rainbow colors for each tile number
const TILE_COLORS = {
  1: '#ff6b6b', // Red
  2: '#feca57', // Orange  
  3: '#48dbfb', // Cyan
  4: '#ff9ff3', // Pink
  5: '#54a0ff', // Blue
  6: '#5f27cd', // Purple
  7: '#00d2d3', // Teal
  8: '#1dd1a1', // Green
};

const PuzzleGame = () => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [draggingTile, setDraggingTile] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    initializeGame();
    // Set loading to false after a brief delay
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  const initializeGame = () => {
    // Create solved state
    const solved = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    
    // Shuffle tiles
    const shuffled = [...solved];
    for (let i = 0; i < 100; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const validMoves = getValidMoves(emptyIndex, shuffled);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
    }
    
    setTiles(shuffled);
    setMoves(0);
    setIsWon(false);
  };

  const getValidMoves = (emptyIndex, currentTiles = tiles) => {
    const row = Math.floor(emptyIndex / GRID_SIZE);
    const col = emptyIndex % GRID_SIZE;
    const validMoves = [];

    // Up
    if (row > 0) validMoves.push(emptyIndex - GRID_SIZE);
    // Down
    if (row < GRID_SIZE - 1) validMoves.push(emptyIndex + GRID_SIZE);
    // Left
    if (col > 0) validMoves.push(emptyIndex - 1);
    // Right
    if (col < GRID_SIZE - 1) validMoves.push(emptyIndex + 1);

    return validMoves;
  };

  const handleTileClick = (index) => {
    if (isWon) return;

    const emptyIndex = tiles.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(moves + 1);

      // Check if won
      const won = newTiles.every((tile, i) => tile === i);
      if (won) {
        setIsWon(true);
      }
    }
  };

  const handleTouchStart = (e, index) => {
    if (tiles[index] === 0 || isWon) return;
    
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      index: index
    });
    setDraggingTile(index);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchMove = (e) => {
    if (!touchStart || isWon) return;
    
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    
    setTouchEnd({
      x: currentX,
      y: currentY
    });

    // Calculate drag offset
    const offsetX = currentX - touchStart.x;
    const offsetY = currentY - touchStart.y;
    
    // Determine allowed direction based on empty space position
    const emptyIndex = tiles.indexOf(0);
    const tileRow = Math.floor(touchStart.index / GRID_SIZE);
    const tileCol = touchStart.index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;
    
    let constrainedX = 0;
    let constrainedY = 0;
    
    // Reset drag state
    setDraggingTile(null);
    setDragOffset({ x: 0, y: 0 });
    
    // Only allow movement toward the empty space
    if (tileRow === emptyRow) {
      // Same row - allow horizontal movement
      if (emptyCol < tileCol && offsetX < 0) {
        // Empty is to the left, allow left swipe
        constrainedX = Math.max(offsetX, -150);
      } else if (emptyCol > tileCol && offsetX > 0) {
        // Empty is to the right, allow right swipe
        constrainedX = Math.min(offsetX, 150);
      }
    }
    
    if (tileCol === emptyCol) {
      // Same column - allow vertical movement
      if (emptyRow < tileRow && offsetY < 0) {
        // Empty is above, allow up swipe
        constrainedY = Math.max(offsetY, -150);
      } else if (emptyRow > tileRow && offsetY > 0) {
        // Empty is below, allow down swipe
        constrainedY = Math.min(offsetY, 150);
      }
    }
    
    setDragOffset({ x: constrainedX, y: constrainedY });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isWon) {
      setDraggingTile(null);
      setDragOffset({ x: 0, y: 0 });
      return;
    }

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    // Determine swipe direction and move the appropriate tile
    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) > minSwipeDistance) {
        // Swipe left or right
        const direction = distanceX > 0 ? 'left' : 'right';
        handleSwipe(touchStart.index, direction);
      }
    } else {
      if (Math.abs(distanceY) > minSwipeDistance) {
        // Swipe up or down
        const direction = distanceY > 0 ? 'up' : 'down';
        handleSwipe(touchStart.index, direction);
      }
    }
  };

  const handleSwipe = (tileIndex, direction) => {
    const emptyIndex = tiles.indexOf(0);
    const tileRow = Math.floor(tileIndex / GRID_SIZE);
    const tileCol = tileIndex % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    let targetIndex = null;

    // Check if the swipe would move a tile into the empty space
    if (direction === 'left' && tileCol > emptyCol && tileRow === emptyRow) {
      // Swipe left: check if empty space is to the left
      targetIndex = tileIndex - 1;
    } else if (direction === 'right' && tileCol < emptyCol && tileRow === emptyRow) {
      // Swipe right: check if empty space is to the right
      targetIndex = tileIndex + 1;
    } else if (direction === 'up' && tileRow > emptyRow && tileCol === emptyCol) {
      // Swipe up: check if empty space is above
      targetIndex = tileIndex - GRID_SIZE;
    } else if (direction === 'down' && tileRow < emptyRow && tileCol === emptyCol) {
      // Swipe down: check if empty space is below
      targetIndex = tileIndex + GRID_SIZE;
    }

    if (targetIndex !== null && targetIndex === emptyIndex) {
      handleTileClick(tileIndex);
    }
  };

  return (
    <div className="puzzle-game">
      <div className="game-header">
        <h1>Sliding</h1>
        <div className="stats">
          <span className="moves">Moves: {moves}</span>
        </div>
      </div>

      <div className={`puzzle-grid ${!isLoading ? 'loaded' : ''}`}>
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === 0 ? 'empty' : ''} ${isWon ? 'won' : ''} ${draggingTile === index ? 'dragging' : ''}`}
            data-tile={tile}
            style={
              tile !== 0 
                ? { 
                    background: TILE_COLORS[tile],
                    transform: draggingTile === index 
                      ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` 
                      : 'translate(0, 0)',
                    animationDelay: `${index * 0.05}s`
                  } 
                : {
                    animationDelay: `${index * 0.05}s`
                  }
            }
            onClick={() => handleTileClick(index)}
            onTouchStart={(e) => handleTouchStart(e, index)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {tile !== 0 && tile}
          </div>
        ))}
      </div>

      {isWon && (
        <div className="victory-message">
          <h2>🎉 You Won!</h2>
          <p>Completed in {moves} moves</p>
        </div>
      )}

      <button className="reset-button" onClick={initializeGame}>
        New Game
      </button>
    </div>
  );
};

export default PuzzleGame;
