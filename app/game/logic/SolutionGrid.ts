import type {GameCellCoord, GameCellValue, SolutionGridValues} from '@game/types'

export class SolutionGrid {
  static make(solution: SolutionGridValues): SolutionGrid {
    return new SolutionGrid(solution)
  }
  solution: SolutionGridValues

  constructor(solution: SolutionGridValues) {
    this.solution = solution
  }

  getCellValue(cellCoord: GameCellCoord): GameCellValue {
    return this.solution[cellCoord[0]][cellCoord[1]]
  }
}