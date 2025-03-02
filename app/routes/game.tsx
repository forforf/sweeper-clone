import {createFileRoute} from '@tanstack/react-router'
import {Game} from '@app/game'
import {createServerFn} from '@tanstack/start'
import {type GameGridValues} from '@app/game/GameGrid'

function initGame(): GameGridValues {
  return [
    [ 'x', '1',null],
    [ '2', '2',null],
    [ 'x', '1',null]
  ]
}

const getGame = createServerFn({
  method: 'GET',
}).handler(() => {
  return initGame()
})

export const Route = createFileRoute('/game')({
  component: RouteComponent,
  loader: () => getGame()
})

function RouteComponent() {
  const gameGridSolution = Route.useLoaderData()
  return (
    <Game gameGridSolution={gameGridSolution}/>
  )
}