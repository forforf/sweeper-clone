import { describe, it, expect, beforeEach } from 'vitest';
import { GameGridSolutionGenerator } from './GameGridSolutionGenerator'; // Adjust import path as needed

describe('GameGridSolutionGenerator', () => {
  let game: GameGridSolutionGenerator;
  const rows = 8;
  const cols = 9;

  beforeEach(() => {
    game = new GameGridSolutionGenerator(rows, cols);
  });

  it('should create board with correct dimensions', () => {
    expect(game.board.length).toBe(rows);
    expect(game.board[0].length).toBe(cols);
  });

  it('should have open cells on evens in a chessboard pattern by default', () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = game.board[i][j];
        expect(cell.isOpen).toBe((i + j) % 2 === 0);
      }
    }
  });

  it('should have open cells on evens in a for even initial cell', () => {
    const evenGame = new GameGridSolutionGenerator(rows, cols, [2,2]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = evenGame.board[i][j];
        expect(cell.isOpen).toBe((i + j) % 2 === 0);
      }
    }
  });

  it('should have open cells on odds in a for odd initial cell', () => {
    const evenGame = new GameGridSolutionGenerator(rows, cols, [1,2]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = evenGame.board[i][j];
        expect(cell.isOpen).toBe((i + j) % 2 === 1);
      }
    }
  });

  it('should only place mines in closed cells', () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = game.board[i][j];
        if (cell.isOpen) {
          expect(cell.isMine).toBe(false);
        }
      }
    }
  });

  it('should correctly count adjacent mines for open cells', () => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0], [1, 1],
    ];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = game.board[i][j];
        let expectedCount = 0;
        for (const [di, dj] of directions) {
          const ni = i + di;
          const nj = j + dj;
          if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
            if (game.board[ni][nj].isMine) {
              expectedCount++;
            }
          }
        }
        expect(cell.number).toBe(expectedCount);
      }
    }
  });

  it('prints Board - manual inspection', () => {
    const someGame = new GameGridSolutionGenerator(rows, cols, [2,2]);
    someGame.printBoard();
  })
});