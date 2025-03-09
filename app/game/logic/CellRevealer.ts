import {GameCellCoord} from '@game/logic/GameGrid'
import {SolutionGrid} from '@game/logic/SolutionGrid'

function gameCellCoordEqual(cell1: GameCellCoord, cell2: GameCellCoord): boolean {
  return cell1.length === cell2.length && cell1.every((val, idx): boolean => val === cell2[idx])
}

function includesGameCellCoord(cells: Array<GameCellCoord>, targetCell: GameCellCoord): boolean {
  return cells.some(cell => gameCellCoordEqual(cell, targetCell) )
}

function pushUnique(cells: Array<GameCellCoord>, cell: GameCellCoord) {
  if (!includesGameCellCoord(cells, cell)) {
    cells.push(cell);
  }
}
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

  // TODO: This appears to be working, but I'm sure it can be optimized
  cellsToShow(currentCell: GameCellCoord): Array<GameCellCoord> {
    const currentCellSolution = this.solutionGrid.getCellValue(currentCell)
    const showList: Array<GameCellCoord> = currentCellSolution === null ? [] : [currentCell]
    if (currentCellSolution === null) {
      const checkedEmpties: Array<GameCellCoord> = []
      console.log('checked empties, initial', checkedEmpties)
      const uncheckedEmpties: Array<GameCellCoord> = [currentCell]

      let safetyValveCount = 0
      while (uncheckedEmpties.length > 0) {
        console.log('while loop uncheckedEmpties', uncheckedEmpties.length, uncheckedEmpties.map(cell => cell.join('-')))
        console.log('checked empties', checkedEmpties.length, checkedEmpties.map(cell => cell.join('-')))
        safetyValveCount += 1
        if (safetyValveCount > (this.maxRowIdx+1)*(this.maxColIdx)) {
          console.log('Something went wrong checking empty cells')
          break;
        }

        // checking the empty cell at the top of the list
        const checkCell= uncheckedEmpties.pop()!
        console.log('after pop uncheckedEmpties size', uncheckedEmpties.length)
        console.log('checking', checkCell.join('-'))
        pushUnique(showList, checkCell)

        this.eachNeighborCoord(checkCell, (neighborCoord) => {
          if (this.cellIsEmpty(neighborCoord) && !includesGameCellCoord(checkedEmpties, neighborCoord)) {
            console.log('found empty cell', neighborCoord)
            console.log('and is not in checkedEmpties')
            pushUnique(uncheckedEmpties, neighborCoord)
          }
          pushUnique(showList, neighborCoord)
        })

        console.log('after checking neigbhors uncheckedEmpties size', uncheckedEmpties.length)
        console.log(uncheckedEmpties.map(cell => cell.join('-')))
        console.log('checked empty', checkCell.join('-'))
        pushUnique(checkedEmpties, checkCell)
        console.log('checked empties', checkedEmpties.map(cell => cell.join('-')))
      }
      // TODO: figure out all the coords of the cells to show
    }
    console.log('final show list', showList.map(cell => cell.join('-')))
    return showList
  }
}