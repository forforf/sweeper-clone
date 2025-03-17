import React, {useEffect} from 'react'
import {Game} from './Game'
import type {SolutionGridValues} from '@game/types'

interface GameInitProps {
  gameGridSolution: SolutionGridValues
}

export function GameInit ({gameGridSolution}: GameInitProps) {

  useEffect(() => {
    // I'm not thrilled with this approach, but I wanted to leverage CSS variables for setting up the grid
    // and I couldn't figure out an elegant approach using `ref`
    const gameEl = document.querySelector<HTMLElement>('.Game')
    if (gameEl != null) {
      const cols = `${gameGridSolution.length}`
      const rows = `${gameGridSolution[0].length}`
      console.log(rows, cols)
      gameEl.style.setProperty('--msgame--rows', rows)
      gameEl.style.setProperty('--msgame--cols', cols)
    }
  }, [])

  return (
    <Game gameGridSolution={gameGridSolution}/>
  )
}

