import React from 'react'
import {GameCell} from 'app/game/game_cell'
import type {GameGridValues} from '@game/GameGrid'
import './board.scss'

interface BoardProps {
  gridCells: GameGridValues
}

export function Board ({gridCells}: BoardProps) {

  const renderCells = (gridCells: GameGridValues) => {
    return gridCells.map((rowCells, i) => {
      return rowCells.map((_, j) => {
        const key = `c${j}-r${i}`
        return <GameCell id={key} key={key}>{gridCells[i][j]}</GameCell>
      })
    })
  }

  const renderGrid = () => {
    return (
      <div className="map">
        { renderCells(gridCells) }
      </div>
    )
  }

  return (
    <div className="Board">
      <div className="outer-border">
        <div className="middle-border">
          <div className="inner-border">
            { renderGrid() }
          </div>
        </div>
      </div>
    </div>
  )
}