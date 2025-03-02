export const ButtonState = {
  active: 'active',
  ready: 'ready'
} as const

export type ButtonStateType = typeof ButtonState[keyof typeof ButtonState]