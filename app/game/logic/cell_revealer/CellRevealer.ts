import {GameCellCoord} from '@game/types'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import { EmptyRegionExplorer } from './EmptyRegionExplorer'

type ExplorerMaker = typeof EmptyRegionExplorer.make

export class CellRevealer {

  static make(solutionGrid: SolutionGrid, explorerMaker: ExplorerMaker): CellRevealer {
    const explorer = explorerMaker(solutionGrid)
    return new CellRevealer(solutionGrid, explorer)
  }

  solutionGrid: SolutionGrid
  explorer: EmptyRegionExplorer

  constructor(solutionGrid: SolutionGrid, explorer: EmptyRegionExplorer) {
    this.solutionGrid = solutionGrid
    this.explorer = explorer
  }

  public cellsToShow(currentCell: GameCellCoord): Array<GameCellCoord> {
    const currentCellValue = this.solutionGrid.getCellValue(currentCell)
    if (currentCellValue !== null) {
      return [currentCell]
    }
    return this.explorer.explore(currentCell)
  }
}
