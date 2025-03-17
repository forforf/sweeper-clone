import {CellRevealer} from './cell_revealer'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import {HiddenCell} from '@game/consts'
import type {GameCellCoord, GameCellValue, GameGridValues} from '@game/types'

export class GameGrid {
  solutionGrid: SolutionGrid
  revealer: CellRevealer

  constructor(solutionGrid: SolutionGrid, cellRevealer: CellRevealer) {
    this.solutionGrid = solutionGrid
    this.revealer = cellRevealer
  }

  initializeGrid(): GameGridValues {
    return this.solutionGrid.solution.map(row => row.map(_ => HiddenCell))
  }

  getSolutionCellValue(cellCoord: GameCellCoord): GameCellValue {
    return this.solutionGrid.getCellValue(cellCoord)
  }

  cloneGrid(origGameCells: GameGridValues): GameGridValues {
    return origGameCells.map(row => [...row])
  }

  cellsToShow(currentCell: GameCellCoord): Array<GameCellCoord> {
    return this.revealer.cellsToShow(currentCell)
  }
}

