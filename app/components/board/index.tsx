import React from 'react'
import {GameCellValue, GameGridValues} from '@services/game'
import {GameButton} from '@components/game_button'
import {Mine} from '@components/mine'
import './board.scss'

interface BoardProps {
  gridCells: GameGridValues
}

interface CellProps {
  id: string
  children: GameCellValue
}

function Cell({id, children}: CellProps) {
  let gridUi: React.ReactNode = children
  if (children === '?') {
    gridUi =  <GameButton />
  }

  if (children === 'x') {
    gridUi = <Mine />
  }

  return (
    <div id={id}>{gridUi}</div>
  )
}

// function Row({rowCells}) {
//   return (
//     <tr>
//       {
//         rowCells.map((cell, i) => <Cell key={i}>{cell}</Cell>)
//       }
//     </tr>
//   )
// }

export function Board ({gridCells}: BoardProps) {

  const renderCells = (gridCells: GameGridValues) => {
    return gridCells.map((rowCells, i) => {
      return rowCells.map((cell, j) => {
        const key = `r-${i}-c-${j}`
        return <Cell id={key} key={key}>{gridCells[i][j]}</Cell>
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