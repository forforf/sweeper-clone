import React, {useState} from 'react'
import './game_button.scss'

export function GameButton() {
  // TODO: Don't use string,use stronger typing
  const [buttonStatus, setButtonStatus] = useState<string>('')

  const pushed = () => {
    setButtonStatus('active')
  }
  const released = () => setButtonStatus('')

  return (
    <button className={`GameButton ${buttonStatus}`} onTouchStart={pushed} onTouchEnd={released}></button>
  )
}