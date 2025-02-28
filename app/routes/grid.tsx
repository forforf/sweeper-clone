import { createFileRoute } from '@tanstack/react-router'
import { Grid } from '@pages/grid'

export const Route = createFileRoute('/grid')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Grid />
}
