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

// // TODO: Move to it's own file
// function intersection<T extends any[]>(arr1: T[], arr2: T[]): T[] {
//   return arr1.filter(element => arr2.includes(element));
// }

export class GameGrid {
  solution: SolutionGridValues

  constructor(solution: SolutionGridValues) {
    this.solution = solution
  }

  initializeGrid(): GameGridValues {
    return this.solution.map(row => row.map(_ => HiddenCell))
  }

  getSolutionCellValue(cellCoord: GameCellCoord): GameCellValue {
    return this.solution[cellCoord[0]][cellCoord[1]]
  }

  cloneGrid(origGameCells: GameGridValues): GameGridValues {
    return origGameCells.map(row => [...row])
  }

  cellsToShow(currentCell: GameCellCoord): Array<GameCellCoord> {
    let cells = [currentCell]
    const currentCellSolution = this.getSolutionCellValue(currentCell)
    if (currentCellSolution === null) {
      // TODO: figure out all the coords of the cells to show
    }
    return cells
  }
}

