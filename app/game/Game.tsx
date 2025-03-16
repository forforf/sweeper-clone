import React, {useRef, useState} from 'react'
import {FlaggedHiddenCell, HiddenCell, MinedCell} from '@game/consts'
import {GameCellCoord, GameCellValue, GameGridValues, SolutionGridValues} from '@game/types'
import {Board} from '@game/board'
import {GameGrid} from '@game/logic/GameGrid'
import {GameFunctions, GameFunctionsContext} from './GameContext'
import {cellIdToCoord} from './cellid_parser'

import './game.scss'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import {CellRevealer} from '@game/logic/cell_revealer'

const PointerState = {
  pressed: 'pressed',
  longPressed: 'longPressed',
  released: 'released'
} as const

export type PointerStateType = typeof PointerState[keyof typeof PointerState]

interface GameProps {
  gameGridSolution: SolutionGridValues
}

export function Game ({gameGridSolution}: GameProps) {
  const solutionGrid = new SolutionGrid(gameGridSolution)
  const cellRevealer = new CellRevealer(solutionGrid)
  const gameGrid = new GameGrid(solutionGrid, cellRevealer)
  const initialGameCells = gameGrid.initializeGrid()
  const [grid, setGrid] = useState<GameGridValues>(initialGameCells)
  const [deaths, setDeaths] = useState<number>(0)

  const getCurrentGameCellValue = (gameCellCoord: GameCellCoord): GameCellValue => {
    return grid[gameCellCoord[0]][gameCellCoord[1]]
  }

  // This is primarily used for setting/removing the flag
  const setGameCell = (value: GameCellValue, gameCellCoord: GameCellCoord): void => {
    const newGameCells = gameGrid.cloneGrid(grid)
    newGameCells[gameCellCoord[0]][gameCellCoord[1]] = value
    setGrid(newGameCells)
  }


  const toggleFlag = (gameCellCoord: GameCellCoord): GameCellValue => {
    const cell = getCurrentGameCellValue(gameCellCoord)
    if ( cell === HiddenCell) {
      return FlaggedHiddenCell
    }
    if ( cell === FlaggedHiddenCell) {
      return HiddenCell
    }
    return cell
  }

  // We will assume there is only a single mouse/pointer (that is multiple buttons can't be long pressed)
  // TODO: Either use pointerState or remove it (and adjust the comment above to match)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pointerState, setPointerState] = useState<PointerStateType>(PointerState.released)
  const pointerPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTimeout = 500 //milliseconds

  const handleDeath = () => {
    setDeaths(deaths + 1)
  }

  const longPressTimeoutFn = (gameCellCoord: GameCellCoord) => {
    return () => {
      setPointerState(PointerState.longPressed)
      const gameCellsToShow = gameGrid.cellsToShow(gameCellCoord)
      const newGrid = gameGrid.cloneGrid(grid)
      gameCellsToShow.forEach((cellToShow) => {
        const solutionGameCellValue = gameGrid.getSolutionCellValue(cellToShow)
        if (solutionGameCellValue === MinedCell) {
          handleDeath()
        }
        newGrid[cellToShow[0]][cellToShow[1]] = solutionGameCellValue
      })
      setGrid(newGrid)
    }
  }

  const handlePointerDown = (cellId: string): void=> {
    const gameCellCoord = cellIdToCoord(cellId)
    // TODO: This will toggle the button on press, but do we need to worry about canceling it?
    //  Since long press clears the button it should be ok?
    // TODO: Should there be a more generic setGameCell?
    setGameCell(toggleFlag(gameCellCoord), gameCellCoord)
    setPointerState(PointerState.pressed)
    pointerPressTimer.current = setTimeout(longPressTimeoutFn(gameCellCoord), longPressTimeout)
  }

  const cancelPointerDown = (_: string): void => {
    clearTimeout(pointerPressTimer.current ?? 0)
    setPointerState(PointerState.released)
  }

  const handlePointerUp = (cellId: string): void => {
    cancelPointerDown(cellId)
  }

  const gameFunctions: GameFunctions = {handlePointerDown, handlePointerUp}

  return (
    <GameFunctionsContext.Provider value={gameFunctions}>
      <div className="Game">
        <div>The Game</div>
        <div>Deaths: {deaths}</div>
        <Board gridCells={grid}/>
      </div>
    </GameFunctionsContext.Provider>
  )
}

