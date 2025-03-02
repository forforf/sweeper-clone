import {createFileRoute} from '@tanstack/react-router'
import {GameInit} from '@app/game'
import {createServerFn} from '@tanstack/start'
import {type GameGridValues} from '@app/game/GameGrid'

function initGame(): GameGridValues {
  return [
    [ '1', 'x', '1',null,null],
    [ '2', '2', '3', '1', '1'],
    [ '1', 'x', '2', 'x', '1'],
    [ '1', '1', '2', '1', '1'],
    [null,null,null,null,null],
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
    <GameInit gameGridSolution={gameGridSolution}/>
  )
}