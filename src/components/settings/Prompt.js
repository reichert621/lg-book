import React from 'react'
import EditableText from '../forms/EditableText'
import css from '../../styles/main.scss'
import classNames from 'classnames'

const Prompt = ({ prompt, onUpdate, onRemove }) => {
  const styles = STYLES(prompt)

  return (
    <div className={css['item-container']} style={styles['item-container']}>

      <EditableText
        item={prompt}
        onUpdate={onUpdate} />

      <div className={css['item-check-container']} style={styles['item']}>
        <div className={styles['item-checkbox']}
             onClick={
               () => onUpdate({ active: !prompt.active })
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

Prompt.propTypes = {
  prompt: React.PropTypes.object,
  onUpdate: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}

const STYLES = (prompt) => {
  return {
    'item-container': {
      color: prompt.active ? 'black' : 'grey'
    },
    'remove-btn': classNames({
      [css['remove-btn']]: true,
      [css['faded']]: !prompt.active
    }),
    'item-checkbox': classNames({
      [css['item-checkbox']]: true,
      [css['active']]: prompt.active
    }),
    item: {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
  }
}

export default Prompt
