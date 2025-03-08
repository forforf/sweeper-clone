import React, {useRef, useState} from 'react'
import {Board} from '@game/board'
import {GameFunctions, GameFunctionsContext} from './GameContext'
import {cellIdToCoord} from './cellid_parser'
import {FlaggedButton, HiddenCell, MinedCell, type GameCellValue, type GameGridValues} from '@game/GameGrid'
import './game.scss'

const PointerState = {
  pressed: 'pressed',
  longPressed: 'longPressed',
  released: 'released'
} as const

type GameCellCoord = [number, number]

export type PointerStateType = typeof PointerState[keyof typeof PointerState]

// TODO: Consider creating a GameGrid class, that can handle cloning, setting and getting game cells
function cloneGame(origGameCells: GameGridValues): GameGridValues {
  return origGameCells.map(row => [...row])
}

interface GameProps {
  gameGridSolution: GameGridValues
}

export function Game ({gameGridSolution}: GameProps) {
  const initialGameCells: GameGridValues = gameGridSolution.map(row => row.map(_ => HiddenCell))
  const [gameCells, setGameCells] = useState<GameGridValues>(initialGameCells)
  const [deaths, setDeaths] = useState<number>(0)

  const getCurrentGameCellValue = (gameCellCoord: GameCellCoord): GameCellValue => {
    return gameCells[gameCellCoord[0]][gameCellCoord[1]]
  }

  const setGameCell = (value: GameCellValue, gameCellCoord: GameCellCoord): void => {
    const newGameCells = cloneGame(gameCells)
    newGameCells[gameCellCoord[0]][gameCellCoord[1]] = value
    setGameCells(newGameCells)
  }


  const toggleFlag = (gameCellCoord: GameCellCoord): GameCellValue => {
    const cell = getCurrentGameCellValue(gameCellCoord)
    if ( cell === HiddenCell) {
      return FlaggedButton
    }
    if ( cell === FlaggedButton) {
      return HiddenCell
    }
    return cell
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

  const handleDeath = () => {
    setDeaths(deaths + 1)
  }

  const longPressTimeoutFn = (gameCellCoord: GameCellCoord) => {
    return () => {
      setPointerState(PointerState.longPressed)
      const solutionGameCellValue = getSolutionCellValue(gameCellCoord)
      if (solutionGameCellValue === MinedCell) {
        handleDeath()
      }
      setGameCell(solutionGameCellValue, gameCellCoord)
    }
  }

  const handlePointerDown = (cellId: string): void=> {
    const gameCellCoord = cellIdToCoord(cellId)
    // TODO: This will toggle the button on press, but do we need to worry about canceling it?
    //  Since long press clears the button it should be ok?
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
        <Board gridCells={gameCells}/>
      </div>
    </GameFunctionsContext.Provider>
  )
}

