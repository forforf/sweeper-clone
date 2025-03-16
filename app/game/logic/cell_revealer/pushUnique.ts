import {GameCellCoord} from '@game/types'
import {includesGameCellCoord} from '@game/logic/cell_revealer/includesGameCellCoord'

export function pushUnique(cells: Array<GameCellCoord>, cell: GameCellCoord) {
  if (!includesGameCellCoord(cells, cell)) {
    cells.push(cell);
  }
}