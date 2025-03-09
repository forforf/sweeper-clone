import { describe, it, expect } from 'vitest'
import {GameGrid, HiddenCell, MinedCell, EmptyCell, SolutionGridValues} from './GameGrid'

describe('GameGrid', () => {
  // Define a sample solution grid with different types of cell values.
  const solution: SolutionGridValues = [
    [EmptyCell, '1', MinedCell],
    ['2', '3', '4'],
    [MinedCell, EmptyCell, '5']
  ]

  // Instantiate GameGrid with the solution grid.
  const grid = new GameGrid(solution)

  it('should initialize the grid with all cells set to HiddenCell', () => {
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

  it('should return the correct solution cell value for valid coordinates', () => {
    expect(grid.getSolutionCellValue([0, 0])).toBe(EmptyCell)
    expect(grid.getSolutionCellValue([0, 1])).toBe('1')
    expect(grid.getSolutionCellValue([0, 2])).toBe(MinedCell)
    expect(grid.getSolutionCellValue([1, 0])).toBe('2')
    expect(grid.getSolutionCellValue([2, 0])).toBe(MinedCell)
    expect(grid.getSolutionCellValue([2, 2])).toBe('5')
  })

  // Optionally, if you want to test for out-of-bound access and expect an error,
  // you can uncomment the following test. Note: since GameGrid doesn't explicitly
  // handle out-of-bound indices, these tests may fail or throw errors.
  /*
  it('should throw an error when accessing a cell out of bounds', () => {
    expect(() => grid.getSolutionCellValue([-1, 0])).toThrow()
    expect(() => grid.getSolutionCellValue([0, solution[0].length])).toThrow()
  })
  */
})

