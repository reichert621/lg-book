import React from 'react'
import EditableText from '../forms/EditableText'
import css from '../../styles/main.scss'
import classNames from 'classnames'

const Goal = ({ goal, onUpdate, onRemove }) => {
  const styles = STYLES(goal)

  return (
    <div className={css['item-container']} style={styles['item-container']}>

      <EditableText
        item={goal}
        onUpdate={onUpdate} />

      <div className={css['item-check-container']} style={styles['item']}>
        <div className={styles['item-checkbox']}
             onClick={
               () => onUpdate({ active: !goal.active })
             }>
        </div>
      </div>

      <div className={css['item-remove']} style={styles['item']}>
        <button className={styles['remove-btn']}
                onClick={onRemove.bind(this)}>
        </button>
      </div>

    </div>
  )
}

Goal.propTypes = {
  goal: React.PropTypes.object,
  onUpdate: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}

const STYLES = (goal) => {
  return {
    'item-container': {
      color: goal.active ? 'black' : 'grey'
    },
    'remove-btn': classNames({
      [css['remove-btn']]: true,
      [css['faded']]: !goal.active
    }),
    'item-checkbox': classNames({
      [css['item-checkbox']]: true,
      [css['active']]: goal.active
    }),
    item: {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
  }
}

export default Goal
