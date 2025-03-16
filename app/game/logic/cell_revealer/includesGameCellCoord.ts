import {GameCellCoord} from '@game/types'

function gameCellCoordEqual(cell1: GameCellCoord, cell2: GameCellCoord): boolean {
  return cell1.length === cell2.length && cell1.every((val, idx): boolean => val === cell2[idx])
}

export function includesGameCellCoord(cells: Array<GameCellCoord>, targetCell: GameCellCoord): boolean {
  return cells.some(cell => gameCellCoordEqual(cell, targetCell) )
}