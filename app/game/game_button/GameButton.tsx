import React, {useMemo, useState} from 'react'
import {useGameFunctions} from '@app/game'
import {ButtonState, type ButtonStateType} from './ButtonState'
import './game_button.scss'

interface GameButtonProps {
  cellId: string;
  label?: string;
}

interface ButtonHandlers {
  down: 'onMouseDown' | 'onTouchStart'
  up: 'onMouseUp' | 'onTouchEnd'
}

export function GameButton({cellId, label}: GameButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonStateType>(ButtonState.ready)
  const {handlePointerDown, handlePointerUp} = useGameFunctions()

  const buttonHandlers= useMemo<ButtonHandlers>(() => {
    // The default behavior of a touch device would be to call both the mouse and the touch event
    // Which can lead to double executions, so we only allow assign touch events to touch devices to avoid this
    const handlers: ButtonHandlers = {
      down: 'onMouseDown',
      up: 'onMouseUp'
    }

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      handlers.down = 'onTouchStart'
      handlers.up = 'onTouchEnd'
    }
    return handlers
  }, [])

  const onPointerDown = (_) => {
    setButtonState(ButtonState.active)
    if (handlePointerDown != null) { handlePointerDown(cellId) }
  }

  const onPointerUp = (_) => {
    setButtonState(ButtonState.ready)
    if (handlePointerUp != null)  { handlePointerUp(cellId) }
  }

  const buttonHandlerProps = {}
  if (handlePointerDown != null) {
    buttonHandlerProps[buttonHandlers.down] = onPointerDown
  }

  if (handlePointerUp != null) {
    buttonHandlerProps[buttonHandlers.up] = onPointerUp
  }

  return (
    <button className={`GameButton ${buttonState}`}
      {...buttonHandlerProps}
    >
      {label}
    </button>
  )
}