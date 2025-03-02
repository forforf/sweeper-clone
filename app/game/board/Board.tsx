import React from 'react'
import {GameGridValues} from '@game/game_cell_value'
import {GameCell} from 'app/game/game_cell'
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

  const renderMap = () => {
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
            { renderMap() }
          </div>
        </div>
      </div>
    </div>
  )
}