import React from 'react'
import './board.scss'
import {GameGridValues} from '@services/game'

interface BoardProps {
  gridCells: GameGridValues
}

interface CellProps {
  children: GameGridValues
}

function Cell({children}: CellProps) {
  return (
    <td>{children}</td>
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