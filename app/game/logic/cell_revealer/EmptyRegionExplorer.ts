import {GameCellCoord} from '@game/types'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import {includesGameCellCoord, pushUnique} from './explorerGameCellCoordHelpers'

export class EmptyRegionExplorer {
  static make(solutionGrid: SolutionGrid) {
    return new EmptyRegionExplorer(solutionGrid)
  }

  public solutionGrid: SolutionGrid
  public toShow: GameCellCoord[] = []
  public checkedEmpties: GameCellCoord[] = []
  public uncheckedEmpties: GameCellCoord[] = []

  private maxRowIdx: number
  private maxColIdx: number

  constructor(solutionGrid: SolutionGrid) {
    this.solutionGrid = solutionGrid
    this.maxRowIdx = this.solutionGrid.solution.length - 1
    this.maxColIdx = this.solutionGrid.solution[0].length - 1
  }

  private cellIsEmpty(cellCoord: GameCellCoord): boolean {
    return this.solutionGrid.getCellValue(cellCoord) === null
  }

  private getNeighbors(cellCoord: GameCellCoord): GameCellCoord[] {
    const neighbors: GameCellCoord[] = []
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue
        const newRow = cellCoord[0] + i
        const newCol = cellCoord[1] + j
        if (newRow < 0 || newRow > this.maxRowIdx) continue
        if (newCol < 0 || newCol > this.maxColIdx) continue
        neighbors.push([newRow, newCol])
      }
    }
    return neighbors
  }

  public explore(startCell: GameCellCoord): GameCellCoord[] {
    this.toShow = []
    this.checkedEmpties = []
    this.uncheckedEmpties = [startCell]

    const isNewEmptyCell = (cell: GameCellCoord) =>
      !includesGameCellCoord(this.checkedEmpties, cell)

    const maxIterations = (this.maxRowIdx + 1) * (this.maxColIdx + 1)

    // The current algorithm will call `pushUnique` even though the coord may already exist in the array
    // The assumption is that calling `pushUnique` is performant enough.
    for (let i = 0; i <= maxIterations; i++) {
      if (this.uncheckedEmpties.length === 0) break

      const emptyCell = this.uncheckedEmpties.pop()!
      pushUnique(this.toShow, emptyCell)

      const neighbors = this.getNeighbors(emptyCell)
      neighbors.forEach((neighbor) => {
        pushUnique(this.toShow, neighbor)
        if (this.cellIsEmpty(neighbor) && isNewEmptyCell(neighbor)) {
          pushUnique(this.uncheckedEmpties, neighbor)
        }
      })

      pushUnique(this.checkedEmpties, emptyCell)
    }

    return this.toShow
  }
}