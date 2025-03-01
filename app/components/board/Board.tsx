import React, {useRef, useState} from 'react'
import {GameGridValues} from '@services/game'
import {GameCell} from '@components/game_cell'
import './board.scss'

interface BoardProps {
  gridCells: GameGridValues
}

export function Board ({gridCells}: BoardProps) {

  const renderCells = (gridCells: GameGridValues) => {
    return gridCells.map((rowCells, i) => {
      return rowCells.map((cell, j) => {
        const key = `r-${i}-c-${j}`
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