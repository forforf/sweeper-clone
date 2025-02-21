import { createFileRoute } from '@tanstack/react-router'
import { Game } from '@pages/game'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Game />
  )
}