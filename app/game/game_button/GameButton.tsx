import React, {useState} from 'react'
import {useGameFunctions} from '@app/game'
import {ButtonState, type ButtonStateType} from './ButtonState'
import './game_button.scss'

interface GameButtonProps {
  cellId: string;
}

export function GameButton({cellId}: GameButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonStateType>(ButtonState.ready)
  const {handlePointerDown, handlePointerUp} = useGameFunctions()

  const handlePress = (_) => {
    setButtonState(ButtonState.active)
    if (handlePointerDown != null) { handlePointerDown(cellId) }
  }

  const handleRelease = (_) => {
    console.log('Button was Released', cellId)
    setButtonState(ButtonState.ready)
    if (handlePointerUp != null)  { handlePointerUp(cellId) }
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