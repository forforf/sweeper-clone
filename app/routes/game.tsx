import {createFileRoute} from '@tanstack/react-router'
import {Game} from '@app/game'
import {createServerFn} from '@tanstack/start'
import {type GameGridValues} from '@app/game/GameGrid'

function initGame(): GameGridValues {
  return [['x']]
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
  const serverState = Route.useLoaderData()
  return (
    <Game serverState={serverState}/>
  )
}