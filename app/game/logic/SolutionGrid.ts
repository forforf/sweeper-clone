import {GameCellCoord, GameCellValue, SolutionGridValues} from './GameGrid'

export class SolutionGrid {
  solution: SolutionGridValues

  constructor(solution: SolutionGridValues) {
    this.solution = solution
  }

  getCellValue(cellCoord: GameCellCoord): GameCellValue {
    return this.solution[cellCoord[0]][cellCoord[1]]
  }
}