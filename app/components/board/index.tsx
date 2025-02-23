import React from 'react'
import {GameCellValue, GameGridValues} from '@services/game'
import {GameButton} from '@components/game_button'
import {Mine} from '@components/mine'
import './board.scss'

interface BoardProps {
  gridCells: GameGridValues
}

interface CellProps {
  children: GameCellValue
}

function Cell({children}: CellProps) {
  let gridUi: React.ReactNode = children
  if (children === '?') {
    gridUi =  <GameButton />
  }

  if (children === 'x') {
    gridUi = <Mine />
  }

  return (
    <td>{gridUi}</td>
  )
}

function Row({rowCells}) {
  return (
    <tr>
      {
        rowCells.map((cell, i) => <Cell key={i}>{cell}</Cell>)
      }
    </tr>
  )
}

export function Board ({gridCells}: BoardProps) {
  const renderTable = () => {
    return (
      <table>
        <tbody>
          {gridCells.map((rowCells, i) => <Row key={i} rowCells={rowCells} />)}
        </tbody>
      </table>
    )
  }

  return (
    <div className="Board">
      <div className="outer-border">
        <div className="middle-border">
          <div className="inner-border">
            { renderTable() }
          </div>
        </div>
      </div>
    </div>
  )
}