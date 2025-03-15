import type {GameCellCoord, GameCellValue, SolutionGridValues} from '@game/types'

export class SolutionGrid {
  solution: SolutionGridValues

  constructor(solution: SolutionGridValues) {
    this.solution = solution
  }

  getCellValue(cellCoord: GameCellCoord): GameCellValue {
    return this.solution[cellCoord[0]][cellCoord[1]]
  }
}