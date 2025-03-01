import {createContext, useContext} from 'react'

export interface GameFunctions {
  handlePointerDown?: (event: TouchEvent) => void
  handlePointerUp?: (event: TouchEvent) => void
}

export const GameFunctionsContext = createContext<GameFunctions>({})

export const useGameFunctions = () => useContext(GameFunctionsContext)
