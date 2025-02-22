import React from 'react'
import { Board } from '@components/board'
import './game.scss'
import {GameGridValues} from '@services/game'



interface GameProps {
  serverState: GameGridValues
}

export function Game ({serverState}: GameProps) {
  const gameCells: GameGridValues = [
    [null, '1', 'x'],
    [null, '2', '2'],
    [null, '1', 'x']
  ]
  // const [cells, setCells] = useState<Array<Cell>>()
  console.log('Server state', serverState)

  return (
    <div className="Game">
      <div>The Game</div>
      <Board gridCells={gameCells}/>
    </div>
  )
}