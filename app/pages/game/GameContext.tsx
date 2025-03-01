import {createContext, useContext} from 'react'

export interface GameFunctions {
  handlePointerDown?: (cellId: string) => void
  handlePointerUp?: (cellId: string) => void
}

export const GameFunctionsContext = createContext<GameFunctions>({})

export const useGameFunctions = () => useContext(GameFunctionsContext)
