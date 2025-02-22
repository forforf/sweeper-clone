export type GameCellValue = null | '?' | 'x' | '1' | '2' | '3' |'4' | '5' | '6' | '7' | '8'
export type GameGridValues = Array<Array<GameCellValue>>  //Might be replaced by GameCell

export class GameCell {
  value: GameCellValue

  // Also inlcude functions that handle clicks on cells
}


