import React, {useContext, useState} from 'react'
import {GameFunctionsContext} from '@pages/game'
import './game_button.scss'

const ButtonState = {
  active: 'active',
  ready: 'ready'
} as const

type ButtonStateType = typeof ButtonState[keyof typeof ButtonState]

export function GameButton() {
  const [buttonState, setButtonState] = useState<ButtonStateType>(ButtonState.ready)
  const {handlePointerDown, handlePointerUp} = useContext(GameFunctionsContext)

  const handlePress = (e) => {
    console.log('Button was Pressed', e)
    setButtonState(ButtonState.active)
    if (handlePointerDown != null) { handlePointerDown(e) }
  }

  const handleRelease = (e) => {
    console.log('Button was Released', e)
    setButtonState(ButtonState.ready)
    if (handlePointerUp != null)  { handlePointerUp(e) }
  }
  //Maybe there's a more declarative way?
  const buttonHandlerProps = {}
  if (handlePointerDown != null) {
    buttonHandlerProps['onTouchStart'] = handlePress
    buttonHandlerProps['onMouseDown'] = handlePress
  }

  if (handlePointerUp != null) {
    buttonHandlerProps['onTouchEnd'] = handleRelease
    buttonHandlerProps['onMouseUp'] = handleRelease
  }

  // console.log('Button State', buttonState)
  return (
    <button className={`GameButton ${buttonState}`}
      {...buttonHandlerProps}
    >
    </button>
  )
}