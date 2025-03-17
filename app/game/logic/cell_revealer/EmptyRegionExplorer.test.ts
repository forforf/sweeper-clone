// 60% ChatGPT Generated
import {describe, it, expect, vi, beforeEach} from 'vitest'
import {EmptyRegionExplorer} from './EmptyRegionExplorer'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import {GameCellCoord} from '@game/types'
import * as helpersModule from './explorerGameCellCoordHelpers'

describe('EmptyRegionExplorer', () => {
  let solutionGridMock: SolutionGrid
  let explorer: EmptyRegionExplorer

  beforeEach(() => {
    // 3x3 grid: null = empty, number = clue (non-empty)
    const mockSolution = [
      [null, 1, null],
      [null, null, 2],
      [3, null, null],
    ]

    solutionGridMock = {
      solution: mockSolution,
      getCellValue: vi.fn(([row, col]: GameCellCoord) => mockSolution[row][col]),
    } as unknown as SolutionGrid

    explorer = EmptyRegionExplorer.make(solutionGridMock)
  })

  describe('.make (factory)', () => {
    it('creates instance of correct type', () => {
      expect(explorer).toBeInstanceOf(EmptyRegionExplorer)
    })

    it('abstracts new method for instantiation', () => {
      const newExplorer = new EmptyRegionExplorer(solutionGridMock)
      expect(explorer.constructor).toBe(newExplorer.constructor)
      expect(explorer.solutionGrid).toEqual(newExplorer.solutionGrid)
    })
  })

  describe('#explore', () => {
    it('shows correct empty cells and neighbors recursively', () => {
      const result = explorer.explore([1, 1]) // center empty

      expect(result).toContainEqual([1, 1]) // clicked cell
      expect(result).toContainEqual([0, 0]) // top-left empty
      expect(result).toContainEqual([1, 0]) // left empty
      expect(result).toContainEqual([2, 1]) // bottom-center empty
      expect(result).toContainEqual([2, 2]) // bottom-right empty
      // Also includes non-empty neighbors (like [0,1], [1,2], [2,0])
      expect(result).toContainEqual([0, 1]) // clue
      expect(result).toContainEqual([1, 2]) // clue
      expect(result).toContainEqual([2, 0]) // clue
    })

    it('handles corner empty cells correctly', () => {
      const result = explorer.explore([0, 0]) // top-left empty

      expect(result).toContainEqual([0, 0]) // itself
      expect(result).toContainEqual([1, 0]) // neighbor empty
      expect(result).toContainEqual([1, 1]) // neighbor empty
      expect(result).toContainEqual([0, 1]) // clue neighbor
    })

    it('handles edges properly (no out-of-bounds)', () => {
      const result = explorer.explore([0, 2]) // top-right empty

      expect(result).toContainEqual([0, 2]) // itself
      expect(result).toContainEqual([1, 1]) // neighbor empty
      expect(result).toContainEqual([1, 2]) // clue neighbor
    })

    it('handles grids of varying sizes', () => {
      const mockSolution = [
        [null, null],
        [1, null],
      ]
      const smallGridMock = {
        solution: mockSolution,
        getCellValue: vi.fn(([row, col]: GameCellCoord) => mockSolution[row][col]),
      } as unknown as SolutionGrid
      const smallExplorer = new EmptyRegionExplorer(smallGridMock)

      const result = smallExplorer.explore([0, 0])

      expect(result).toContainEqual([0, 0])
      expect(result).toContainEqual([0, 1])
      expect(result).toContainEqual([1, 1])
      expect(result).toContainEqual([1, 0]) // clue
    })

    it('does not reveal cells blocked by clues', () => {
      const mockSolution = [
        [ 'x', 1, null],
        [  1,  1, null]
      ]
      const smallGridMock = {
        solution: mockSolution,
        getCellValue: vi.fn(([row, col]: GameCellCoord) => mockSolution[row][col]),
      } as unknown as SolutionGrid
      const smallExplorer = new EmptyRegionExplorer(smallGridMock)

      const result = smallExplorer.explore([1, 2])

      expect(result).toContainEqual([0, 1])
      expect(result).toContainEqual([0, 2])
      expect(result).toContainEqual([1, 1])
      expect(result).toContainEqual([1, 2])
      expect(result).not.toContainEqual([0, 0])
      expect(result).not.toContainEqual([1, 0])
    })

    it('tracks array', () => {
      const iterGrid = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ]
      const iterGridMock = {
        solution: iterGrid,
        getCellValue: ([row, col]: [number, number]) => iterGrid[row][col],
      } as unknown as SolutionGrid
      const iterationExplorer = EmptyRegionExplorer.make(iterGridMock)
      const pushUniqueSpy = vi.spyOn(helpersModule, 'pushUnique')

      iterationExplorer.explore([1, 1])
      const uncheckedEmptyCalls = pushUniqueSpy.mock.calls.filter(
        ([targetArray]) => targetArray === iterationExplorer.uncheckedEmpties
      )
      const checkedEmptyCalls = pushUniqueSpy.mock.calls.filter(
        ([targetArray]) => targetArray === iterationExplorer.checkedEmpties
      )
      const toShowCalls = pushUniqueSpy.mock.calls.filter(
        ([targetArray]) => targetArray === iterationExplorer.toShow
      )

      // Final array status
      expect(iterationExplorer.uncheckedEmpties.length).toEqual(0) // no unchecked coords left
      expect(iterationExplorer.toShow.length).toEqual(16) // 16 coords to show
      expect(iterationExplorer.checkedEmpties.length).toEqual(16) // 16 coords checked

      // TODO: if performance becomes an issue for large grids, look at ways to reduce these calls
      expect(uncheckedEmptyCalls.length).toEqual(42)
      expect(checkedEmptyCalls.length).toEqual(16)
      expect(toShowCalls.length).toEqual(100)
    })
  })
})