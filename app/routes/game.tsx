import {createFileRoute} from '@tanstack/react-router'
import {GameInit} from '@app/game'
import {createServerFn} from '@tanstack/start'
import type {GameCellCoord, SolutionGridValues} from '@game/types'
import {GameGridSolutionGenerator} from '@game/logic/GameGridSolutionGenerator'

function initGame(startCell: GameCellCoord | null): SolutionGridValues {
  const gameRows = 16
  const gameCols = 9
  if (startCell == null) {
    startCell = [0, 0]
  }
  const gameBoard = new GameGridSolutionGenerator(gameRows, gameCols, startCell)
  return gameBoard.solutionBoard
}

// TODO: Have an initGame and a getGame
// initGame just returns a grid of appropriate size
// getGame will return a solvable game based on the first cell clicked
// gameId to set the gameId the gameId maps to a specific solution, so a brand new game should have a new gameId
// but an ongoing game that was restarted would use the existing gameId
const changeToFakeGame = initGame(null)

const getGame = createServerFn({
  method: 'GET',
}).handler(() => {
  return changeToFakeGame
})

export const Route = createFileRoute('/game')({
  component: RouteComponent,
  loader: () => getGame()
})

function RouteComponent() {
  console.log('game route')
  const gameGridSolution = Route.useLoaderData() ?? changeToFakeGame
  console.log(gameGridSolution)
  return (
    <GameInit gameGridSolution={gameGridSolution}/>
  )
}