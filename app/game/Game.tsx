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

const SolutionGameCells: GameGridValues = [
  [null, '1', 'x'],
  [null, '2', '2'],
  [null, '1', 'x']
] as const

function getSolutionCellValue(cellIdxs: GameCellIdx): GameCellValue {
  return SolutionGameCells[cellIdxs[0]][cellIdxs[1]]
}

const InitialGameCells: GameGridValues = [
  [ '?', '?', '?'],
  [ '?', '?', '?'],
  [ '?', '?', '?']
] as const

function cloneGame(origGameCells: GameGridValues): GameGridValues {
  return origGameCells.map(row => [...row])
}

type GameCellIdx = [number, number]

interface GameProps {
  serverState: GameGridValues
}

export function Game ({serverState}: GameProps) {

  const [gameCells, setGameCells] = useState<GameGridValues>(InitialGameCells)
  const setGameCell = (value: GameCellValue, cellIdxs: GameCellIdx): void => {
    const newGameCells = cloneGame(gameCells)
    newGameCells[cellIdxs[0]][cellIdxs[1]] = value
    setGameCells(newGameCells)
  }

  // We will assume there is only a single mouse/pointer (that is multiple buttons can't be long pressed)
  const [pointerState, setPointerState] = useState<PointerStateType>(PointerState.released)
  const pointerPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTimeout = 500; //milliseconds

  const handlePointerDown = (cellId: string): void=> {
    setPointerState(PointerState.pressed)
    pointerPressTimer.current = setTimeout(() => {
      setPointerState(PointerState.longPressed)
      const gameCellIdxs = cellIdToCoord(cellId)
      const solutionGameCellValue = getSolutionCellValue(gameCellIdxs)
      setGameCell(solutionGameCellValue, gameCellIdxs)
    }, longPressTimeout)
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

