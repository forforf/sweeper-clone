import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBurst} from '@fortawesome/free-solid-svg-icons'
import './mine.scss'

export function Mine() {
  return (
    <div className="Mine">
      <FontAwesomeIcon icon={faBurst} />
    </div>
  )
}