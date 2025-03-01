import React, {useRef, useState} from 'react'
import {GameGridValues} from '@services/game'
import {Board} from '@components/board'
import {GameFunctions, GameFunctionsContext} from './GameContext'
import './game.scss'

export { GameFunctionsContext }

const PointerState = {
  pressed: 'pressed',
  longPressed: 'longPressed',
  released: 'released'
} as const

type PointerStateType = typeof PointerState[keyof typeof PointerState]

interface GameProps {
  serverState: GameGridValues
}

export function Game ({serverState}: GameProps) {
  const gameCells: GameGridValues = [
    [null, '1', 'x'],
    [ '?', '2', '2'],
    [ '?', '1', 'x']
  ]
  // const [cells, setCells] = useState<Array<Cell>>()
  console.log('Server state', serverState)

  // We will assume there is only a single mouse/pointer (that is multiple buttons can't be long pressed)
  const [pointerState, setPointerState] = useState<PointerStateType>(PointerState.released)
  const pointerPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTimeout = 1500; //milliseconds

  const handlePointerDown = (): void=> {
    console.log(pointerState, 'Game -> button pressed')
    setPointerState(PointerState.pressed)
    pointerPressTimer.current = setTimeout(() => {
      setPointerState(PointerState.longPressed)
      console.log(pointerState, 'Game -> button longPressed')
    }, longPressTimeout)
  }

  const cancelPointerDown = (): void => {
    console.log(pointerState, 'Game -> button released or cancelled')
    clearTimeout(pointerPressTimer.current ?? 0)
    setPointerState(PointerState.released)
  }

  const handlePointerUp = (): void => {
    cancelPointerDown()
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