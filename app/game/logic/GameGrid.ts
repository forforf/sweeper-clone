import { CellRevealer } from './CellRevealer'
import {SolutionGrid} from '@game/logic/SolutionGrid'
export const HiddenCell = '?'
export const FlaggedHiddenCell = '𐘺' // other options: ᛩ ᚹ ᚦ ᚧ ᚨ 𐘹 𐘺 𐘷 𐘌 𐘍 𐘄 𐘅 𐘆 𐘇 𐀣 𓌏 𐂕 ᛭
export const MinedCell = 'x'
export const EmptyCell = null
export type SolutionCellValue = typeof EmptyCell |
  typeof MinedCell |
  '1' | '2' | '3' |'4' | '5' | '6' | '7' | '8'
export type GameCellValue = SolutionCellValue |
  typeof HiddenCell |
  typeof FlaggedHiddenCell

export type SolutionGridValues = Array<Array<SolutionCellValue>>
export type GameGridValues = Array<Array<GameCellValue>>


export type GameCellCoord = [number, number]

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

