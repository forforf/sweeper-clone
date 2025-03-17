// 70% ChatGPT Generated
import {describe, it, expect, vi, afterEach, beforeEach, MockInstance} from 'vitest'
import {CellRevealer} from './CellRevealer'
import {SolutionGrid} from '@game/logic/SolutionGrid'
import {GameCellCoord} from '@game/types'
import {EmptyRegionExplorer} from './EmptyRegionExplorer'

describe('CellRevealer', () => {
  let solutionGridMock: SolutionGrid
  let explorerSpy: MockInstance<EmptyRegionExplorer["explore"]>
  let revealer: CellRevealer

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

    revealer = CellRevealer.make(solutionGridMock, EmptyRegionExplorer.make)
    explorerSpy = vi.spyOn(revealer.explorer, 'explore')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('.make (factory)', () => {
    it('creates instance of correct type', () => {
      expect(revealer).toBeInstanceOf(CellRevealer)
    })

    it('abstracts new method for instantiation', () => {
      const newRevealer = new CellRevealer(solutionGridMock, EmptyRegionExplorer.make(solutionGridMock))

      expect(revealer.constructor).toBe(newRevealer.constructor)
      expect(revealer.solutionGrid).toEqual(newRevealer.solutionGrid)
    })
  })

  // I couldn't decide if I wanted to do unit or integration tests here, so I did a mix of both.
  // Not that I recommend this approach, but it was just because the integration tests predated the unit tests,
  // and I didn't want to delete them.
  describe('#cellsToShow', () => {
    it('reveals only the clicked non-empty cell', () => {
      const result = revealer.cellsToShow([0, 1])

      expect(explorerSpy).not.toHaveBeenCalled()
      expect(result).toEqual([[0, 1]])
    })

    it('reveals correct empty cells and neighbors recursively', () => {
      const result = revealer.cellsToShow([1, 1]) // center empty

      expect(explorerSpy).toHaveBeenCalledWith([1,1])
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
      const result = revealer.cellsToShow([0, 0]) // top-left empty

      expect(explorerSpy).toHaveBeenCalledWith([0,0])
      expect(result).toContainEqual([0, 0]) // itself
      expect(result).toContainEqual([1, 0]) // neighbor empty
      expect(result).toContainEqual([1, 1]) // neighbor empty
      expect(result).toContainEqual([0, 1]) // clue neighbor
    })

    it('handles edges properly (no out-of-bounds)', () => {
      const result = revealer.cellsToShow([0, 2]) // top-right empty

      expect(explorerSpy).toHaveBeenCalledWith([0,2])
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
      const smallRevealer = CellRevealer.make(smallGridMock, EmptyRegionExplorer.make)
      const smallExplorerSpy = vi.spyOn(smallRevealer.explorer, 'explore')

      const result = smallRevealer.cellsToShow([0, 0])

      expect(smallExplorerSpy).toHaveBeenCalledWith([0,0])
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
      const smallRevealer = CellRevealer.make(smallGridMock, EmptyRegionExplorer.make)
      const smallExplorerSpy = vi.spyOn(smallRevealer.explorer, 'explore')

      const result = smallRevealer.cellsToShow([1, 2])

      expect(smallExplorerSpy).toHaveBeenCalledWith([1,2])
      expect(result).toContainEqual([0, 1])
      expect(result).toContainEqual([0, 2])
      expect(result).toContainEqual([1, 1])
      expect(result).toContainEqual([1, 2])

      expect(result).not.toContainEqual([0, 0])
      expect(result).not.toContainEqual([1, 0])
    })
  })
})