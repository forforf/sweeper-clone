import {SolutionCellValue, SolutionGridValues} from '@game/types'

/**
 * Implementation of a Minesweeper board generator based on the
 * algorithm and theoretical results from:
 *
 * O. German and E. Lakshtanov,
 * "Minesweeper and spectrum of discrete Laplacians,"
 * arXiv:0806.3480 [cs.DM], 2009.
 *
 * The algorithm generates Minesweeper puzzles with guaranteed unique solutions
 * by opening cells in a chessboard pattern and placing mines accordingly,
 * under certain board dimension conditions (coprimality of rows+1 and cols+1).
 *
 * For more details, see the original paper:
 * https://arxiv.org/abs/0806.3480
 **/

type Cell = {
  isOpen: boolean;    // true if open (number shown), false if closed (mine or unknown)
  isMine: boolean;    // true if mine
  number?: number;    // number of adjacent mines (only for open cells)
};

type InitialCell = [number, number];

type Parity = 0 | 1;

export class GameGridSolutionGenerator {
  board: Cell[][];
  initialCell: InitialCell;
  solutionBoard: SolutionGridValues;
  rows: number;
  cols: number;
  checkerBoardPatternParity: Parity; // 0 for even, 1 for odd

  constructor(rows: number, cols: number, initialCell: InitialCell = [0, 0]) {
    if (!this.areCoprime(rows + 1, cols + 1)) {
      console.warn('Warning: For guaranteed uniqueness, rows+1 and cols+1 should be coprime.');
    }

    this.initialCell = initialCell;
    this.rows = rows;
    this.cols = cols;
    this.checkerBoardPatternParity = (initialCell[0] + initialCell[1]) % 2 as Parity;
    this.board = this.initBoard();
    this.placeMines();
    this.calculateNumbers();
    this.solutionBoard = this.toGameGridSolution();
  }

  private isCellOpen(i: number, j: number): boolean {
    return ((i + j) % 2 === this.checkerBoardPatternParity)
  }

  // Initialize board with chessboard pattern for open cells
  private initBoard(): Cell[][] {
    const board: Cell[][] = [];
    for (let i = 0; i < this.rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.cols; j++) {
        // Open cells: (i + j) even
        const isOpen = this.isCellOpen(i, j);
        row.push({
          isOpen,
          isMine: false,
          number: isOpen ? 0 : undefined,
        });
      }
      board.push(row);
    }
    return board;
  }

  // Bernoulli test with p = 0.5 to place mines in closed cells
  private placeMines() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = this.board[i][j];
        if (!cell.isOpen) {
          // Do not place mines around initial cell
          if (i >= this.initialCell[0]-1 && i <= this.initialCell[0]+1
            && j >= this.initialCell[1]-1 && j <= this.initialCell[1]+1) {
            cell.isMine = false;
          } else {
            cell.isMine = Math.random() < 0.5; // 50% chance of mine
          }
        }
      }
    }
  }

  // Calculate numbers for open cells based on adjacent mines
  private calculateNumbers() {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1],
    ];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = this.board[i][j];
        let count = 0;
        for (const [di, dj] of directions) {
          const ni = i + di;
          const nj = j + dj;
          if (ni >= 0 && ni < this.rows && nj >= 0 && nj < this.cols) {
            if (this.board[ni][nj].isMine) {
              count++;
            }
          }
        }
        cell.number = count;
      }
    }
  }

  private convertToSolutionCellValue(cell: Cell): SolutionCellValue {
    if (cell.isOpen && cell.number === undefined) return null as SolutionCellValue;
    if (cell.isMine) return 'x' as SolutionCellValue;
    // if (cell.number > 0 && cell.number < 9) return cell.number as SolutionCellValue;
    if (cell.number && cell.number > 0 && cell.number < 9) return cell.number.toString() as SolutionCellValue;
    // throw new Error(`Invalid cell value: ${JSON.stringify(cell)}`);
    return null as SolutionCellValue
  }

  // Utility: Check if two numbers are coprime (for theoretical uniqueness guarantee)
  private areCoprime(a: number, b: number): boolean {
    function gcd(x: number, y: number): number {
      return y === 0 ? x : gcd(y, x % y);
    }
    return gcd(a, b) === 1;
  }

  private toGameGridSolution(): SolutionGridValues {
    return this.board.map(row => row.map(cell => this.convertToSolutionCellValue(cell)));
  }

  // Print or export board for display or further use
  printBoard() {
    for (const row of this.solutionBoard) {
      const line = row.map(cell => cell || '_').join(' ');
      console.log(line);
    }
  }
}


// // Example usage:
// const game = new PaperMinesweeper(8, 9);
// game.printBoard();