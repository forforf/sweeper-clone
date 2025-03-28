// 70% Generated by ChatGPT
import { describe, it, expect } from 'vitest'
import {GameGrid} from './GameGrid'
import {HiddenCell, MinedCell, EmptyCell, FlaggedHiddenCell} from '@game/consts'
import type {GameGridValues, SolutionGridValues} from '@game/types'
import {CellRevealer} from '@game/logic/cell_revealer'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import {EmptyRegionExplorer} from '@game/logic/cell_revealer/EmptyRegionExplorer'

describe('GameGrid', () => {
  // Define a sample solution grid with different types of cell values.
  const solution: SolutionGridValues = [
    [EmptyCell, '1', MinedCell],
    ['2', '3', '4'],
    [MinedCell, EmptyCell, '5']
  ]

  const solutionGrid = SolutionGrid.make(solution)
  const cellRevealer = CellRevealer.make(solutionGrid, EmptyRegionExplorer.make)
  const grid = new GameGrid(solutionGrid, cellRevealer)

  describe('initialize', () => {
    it('initializes the grid with all cells set to HiddenCell', () => {
      const gameGrid = grid.initializeGrid()
      // Ensure the grid has the same dimensions as the solution grid.
      expect(gameGrid.length).toBe(solution.length)
      for (let row = 0; row < gameGrid.length; row++) {
        expect(gameGrid[row].length).toBe(solution[row].length)
        // Every cell in the initialized grid should be HiddenCell.
        for (let col = 0; col < gameGrid[row].length; col++) {
          expect(gameGrid[row][col]).toBe(HiddenCell)
        }
      }
    })
  })

  describe('#getSolutionCellValue', () => {
    it('returns the correct solution cell value for valid coordinates', () => {
      expect(grid.getSolutionCellValue([0, 0])).toBe(EmptyCell)
      expect(grid.getSolutionCellValue([0, 1])).toBe('1')
      expect(grid.getSolutionCellValue([0, 2])).toBe(MinedCell)
      expect(grid.getSolutionCellValue([1, 0])).toBe('2')
      expect(grid.getSolutionCellValue([2, 0])).toBe(MinedCell)
      expect(grid.getSolutionCellValue([2, 2])).toBe('5')
    })
  })


  describe('#clone', () => {
    const originalGrid: GameGridValues = [
      [HiddenCell, '1', HiddenCell],
      ['2', HiddenCell, '3']
    ]

    it('should return a grid with the same content as the original', () => {
      const clonedGrid = grid.cloneGrid(originalGrid)
      expect(clonedGrid).toEqual(originalGrid)
    })

    it('should return a new array of rows (each row is a new array)', () => {
      const clonedGrid = grid.cloneGrid(originalGrid)
      // Check that the top-level arrays are not the same instance.
      expect(clonedGrid).not.toBe(originalGrid)
      // Check that each inner array (row) is also a new instance.
      for (let i = 0; i < originalGrid.length; i++) {
        expect(clonedGrid[i]).not.toBe(originalGrid[i])
      }
    })

    it('modifying the cloned grid should not affect the original grid', () => {
      const clonedGrid = grid.cloneGrid(originalGrid)
      // Modify the cloned grid.
      clonedGrid[0][0] = FlaggedHiddenCell
      // The original grid should remain unchanged.
      expect(originalGrid[0][0]).toBe(HiddenCell)
    })
  })
})

