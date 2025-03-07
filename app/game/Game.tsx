import React, {useRef, useState} from 'react'
import {Board} from '@game/board'
import {GameFunctions, GameFunctionsContext} from './GameContext'
import {cellIdToCoord} from './cellid_parser'
import type {GameCellValue, GameGridValues} from '@game/GameGrid'
import './game.scss'

const PointerState = {
  pressed: 'pressed',
  longPressed: 'longPressed',
  released: 'released'
} as const

export type PointerStateType = typeof PointerState[keyof typeof PointerState]

const HiddenCell: GameCellValue = '?'

function cloneGame(origGameCells: GameGridValues): GameGridValues {
  return origGameCells.map(row => [...row])
}

type GameCellCoord = [number, number]

interface GameProps {
  gameGridSolution: GameGridValues
}

export function Game ({gameGridSolution}: GameProps) {
  const initialGameCells = gameGridSolution.map(row => row.map(_ => HiddenCell))
  const [gameCells, setGameCells] = useState<GameGridValues>(initialGameCells)
  const setGameCell = (value: GameCellValue, cellIdxs: GameCellCoord): void => {
    const newGameCells = cloneGame(gameCells)
    newGameCells[cellIdxs[0]][cellIdxs[1]] = value
    setGameCells(newGameCells)
  }

  const getSolutionCellValue = (cellIdxs: GameCellCoord): GameCellValue => {
    return gameGridSolution[cellIdxs[0]][cellIdxs[1]]
  }

  // We will assume there is only a single mouse/pointer (that is multiple buttons can't be long pressed)
  // TODO: Either use pointerState or remove it (and adjust the comment above to match)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pointerState, setPointerState] = useState<PointerStateType>(PointerState.released)
  const pointerPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTimeout = 500; //milliseconds

  const longPressTimeoutFn = (gameCellCoord: GameCellCoord) => {
    return () => {
      setPointerState(PointerState.longPressed)
      const solutionGameCellValue = getSolutionCellValue(gameCellCoord)
      setGameCell(solutionGameCellValue, gameCellCoord)
    }
  }

  const handlePointerDown = (cellId: string): void=> {
    const gameCellCoord = cellIdToCoord(cellId)
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

  type PointerStateType = typeof PointerState[keyof typeof PointerState]

  return (
    <GameFunctionsContext.Provider value={gameFunctions}>
      <div className="Game">
        <div>The Game</div>
        <Board gridCells={gameCells}/>
      </div>
    </GameFunctionsContext.Provider>
  )
}

