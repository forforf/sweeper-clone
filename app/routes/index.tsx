import {createFileRoute, Link} from '@tanstack/react-router'
import { Route as countRoute } from '@routes/count'
import { Route as gameRoute } from '@routes/game'
import { Route as gridRoute } from '@routes/grid'


export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <ul>
      <li>
        <Link to={gameRoute.to}>Game</Link>
      </li>
      <li>
        <Link to={countRoute.to}>Count</Link>
      </li>
      <li>
        <Link to={gridRoute.to}>Grid Playground</Link>
      </li>
    </ul>
  )
}