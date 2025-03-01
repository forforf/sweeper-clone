import React from 'react'
import {GameCellValue} from '@services/game'
import {GameButton} from '@components/game_button'
import {Mine} from '@components/mine'
import './game_cell.scss'

interface GameCellProps {
  id: string
  children: GameCellValue
}

export function GameCell({id, children}: GameCellProps) {
  let gridUi: React.ReactNode = children
  if (children === '?') {
    gridUi =  <GameButton cellId={id}/>
  }

  if (children === 'x') {
    gridUi = <Mine />
  }

  return (
    <div id={id} className="GameCell">
      <div className="game-cell-value">
        {gridUi}
      </div>
    </div>
  )
}