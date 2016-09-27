import React from 'react'
import css from './Entry.scss'

const Goal = ({ goal, handleToggle }) => {
  return (
    <div
      style={
        { textDecoration: goal.finished ? 'line-through' : 'none' }
      }
      className={css['list-item-goal']}
      onClick={handleToggle}>

      {goal.text}

    </div>
  )
}

export default Goal
