import React from 'react'
import {GameButton} from '@game/game_button'
import {Mine} from '@game/mine'
import type {GameCellValue} from '@game/GameGrid'
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