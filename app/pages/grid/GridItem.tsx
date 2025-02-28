import React from 'react'

interface GridItemProps {
  children: React.ReactNode
}

export function GridItem ({children}: GridItemProps) {
  return (
    <div className="GridItem">{children}</div>
  )
}
