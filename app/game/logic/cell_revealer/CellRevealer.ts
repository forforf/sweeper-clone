import {GameCellCoord} from '@game/types'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import {includesGameCellCoord} from './includesGameCellCoord'
import {pushUnique} from './pushUnique'

export class CellRevealer {
  solutionGrid: SolutionGrid
  maxRowIdx: number
  maxColIdx: number

  constructor(solutionGrid: SolutionGrid) {
    this.solutionGrid = solutionGrid
    this.maxRowIdx = this.solutionGrid.solution.length -1
    this.maxColIdx = this.solutionGrid.solution[0].length - 1
  }

  cellIsEmpty(cellCoord: GameCellCoord): boolean {
    return this.solutionGrid.getCellValue(cellCoord) === null
  }

  // Returns neighbors (not including self)
  eachNeighborCoord(cellCoord: GameCellCoord, callback: (cell: GameCellCoord) => void) {
    for (let i = -1; i<= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) { continue } // skip self
        const newRowIdx = cellCoord[0] + i
        if (newRowIdx < 0 || newRowIdx > this.maxRowIdx) { continue } // skip if outside grid
        const newColIdx = cellCoord[1] + j
        if (newColIdx < 0 || newColIdx > this.maxColIdx) { continue } // skip if outside grid
        const newCellCoord: GameCellCoord = [newRowIdx, newColIdx]
        callback(newCellCoord)
      }
    }
  }

  cellsToShow(currentCell: GameCellCoord): Array<GameCellCoord> {
    const currentCellValue = this.solutionGrid.getCellValue(currentCell)

    if (currentCellValue !== null) {
      return [currentCell]
    }

    const showList: Array<GameCellCoord> = []
    const checkedEmpties: Array<GameCellCoord> = []
    const uncheckedEmpties: Array<GameCellCoord> = [currentCell]

    const isNewEmptyCell = (cell: GameCellCoord): boolean => {
      return !includesGameCellCoord(checkedEmpties, cell)
    }

    // set maximum iterations as a safety to prevent infinite loops
    const maxIterations = (this.maxRowIdx+1) * (this.maxColIdx+1)
    for (let i = 0; i<=(maxIterations); i++) {
      if (uncheckedEmpties.length === 0) { break }
      const emptyCell= uncheckedEmpties.pop()! // get next empty cell

      pushUnique(showList, emptyCell) // add it to the list of cells to reveal

      this.eachNeighborCoord(emptyCell, (neighborCoord) => {
        if (this.cellIsEmpty(neighborCoord) && isNewEmptyCell(neighborCoord)) {
          pushUnique(uncheckedEmpties, neighborCoord)
        }
        pushUnique(showList, neighborCoord) // add all neighbors to be revealed
      })

      pushUnique(checkedEmpties, emptyCell) // this empty has
    }

    return showList
  }
}
