import React from 'react'
import { Board } from '@components/board'
import './game.scss'

export function Game () {
  return (
    <div className="Game">
      <div>The Game</div>
      <Board />
    </div>
  )
}