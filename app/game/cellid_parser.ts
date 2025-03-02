// Game Logic and Helpers
const CellIdRegex = /^c(\d+)-r(\d+)$/

export function cellIdToCoord(cellId: string): [number, number] {
  const match = CellIdRegex.exec(cellId) ?? ['', '-1', '-1']
  const rowIdx = +match[1]
  const colIdx = +match[2]
  return [colIdx, rowIdx]
}
