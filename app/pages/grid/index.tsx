import React from 'react'
import {GridItem} from './GridItem'
import './grid.scss'

export function Grid() {
  return (
    <div className="Grid">
      <GridItem><button></button></GridItem>
      <GridItem>1</GridItem>
      <GridItem>1</GridItem>
      <GridItem>1</GridItem>
      <GridItem><button></button></GridItem>
      <GridItem>1</GridItem>
      <GridItem>1</GridItem>
      <GridItem>1</GridItem>
      <GridItem>9</GridItem>
    </div>
  )
}