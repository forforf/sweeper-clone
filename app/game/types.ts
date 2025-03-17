import {EmptyCell, FlaggedHiddenCell, HiddenCell, MinedCell} from '@game/consts'

export type GameCellCoord = [number, number]

export type SolutionCellValue = typeof EmptyCell |
  typeof MinedCell |
  '1' | '2' | '3' |'4' | '5' | '6' | '7' | '8'
export type GameCellValue = SolutionCellValue |
  typeof HiddenCell |
  typeof FlaggedHiddenCell

export type SolutionGridValues = Array<Array<SolutionCellValue>>
export type GameGridValues = Array<Array<GameCellValue>>