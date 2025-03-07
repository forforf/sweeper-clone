export const HiddenCell = '?'
export const FlaggedButton = '𐘺' // other options: ᛩ ᚹ ᚦ ᚧ ᚨ 𐘹 𐘺 𐘷 𐘌 𐘍 𐘄 𐘅 𐘆 𐘇 𐀣 𓌏 𐂕 ᛭
export const MinedCell = 'x'
export type GameCellValue = null |
  typeof HiddenCell |
  typeof FlaggedButton |
  typeof MinedCell |
  '1' | '2' | '3' |'4' | '5' | '6' | '7' | '8'
export type GameGridValues = Array<Array<GameCellValue>>

