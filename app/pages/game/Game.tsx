import React, {useRef, useState} from 'react'
import {GameCellValue, GameGridValues} from '@services/game'
import {Board} from '@components/board'
import {GameFunctions, GameFunctionsContext} from './GameContext'
import {cellIdIdxs} from './cellid_parser'
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

  const getGameCellValue = (cellIdxs: GameCellIdx): GameCellValue => {
    return gameCells[cellIdxs[0]][cellIdxs[1]]
  }

  console.log('Server state', serverState)

  // We will assume there is only a single mouse/pointer (that is multiple buttons can't be long pressed)
  const [pointerState, setPointerState] = useState<PointerStateType>(PointerState.released)
  const pointerPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTimeout = 500; //milliseconds

  const handlePointerDown = (cellId: string): void=> {

    console.log(pointerState, 'Game -> button pressed')
    setPointerState(PointerState.pressed)
    pointerPressTimer.current = setTimeout(() => {
      setPointerState(PointerState.longPressed)
      const gameCellIdxs = cellIdIdxs(cellId)
      const solutionGameCellValue = getSolutionCellValue(gameCellIdxs)
      setGameCell(solutionGameCellValue, gameCellIdxs)
      console.log(pointerState, 'Game -> button longPressed')

    }, longPressTimeout)
  }

  const cancelPointerDown = (cellId: string): void => {
    console.log(pointerState, 'Game -> button released or cancelled', getGameCellValue(cellIdIdxs(cellId)))
    clearTimeout(pointerPressTimer.current ?? 0)
    setPointerState(PointerState.released)
  }

  const handlePointerUp = (cellId: string): void => {
    cancelPointerDown(cellId)
  }

  const gameFunctions: GameFunctions = {handlePointerDown, handlePointerUp}

  type PointerStateType = typeof PointerState[keyof typeof PointerState]

  console.log('render game')
  console.log('Pointer State:', pointerState)
  return (
    <GameFunctionsContext.Provider value={gameFunctions}>
      <div className="Game">
        <div>The Game</div>
        <Board gridCells={gameCells}/>
      </div>
    </GameFunctionsContext.Provider>
  )
}

