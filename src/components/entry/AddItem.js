import React from 'react'
import styles from './Entry.scss'

export class AddItem extends React.Component {
  _addItem () {
    const text = this._input.value || ''

    if (text.length) {
      this.props.addItem(text)
      this.resetInput()
    }
  }

  resetInput () {
    this._input.value = ''
  }

  handleKeyDown (e) {
    if (e.which === 13) {
      this._addItem()
    }
  }

  render () {
    const { placeholder } = this.props

    return (
      <div className={styles['input-add-item']}>
        <input type='text' className='form-control'
            ref={(c) => this._input = c}
            placeholder={placeholder || 'Enter new...'}
            onKeyDown={this.handleKeyDown.bind(this)} />
        <button className='btn'
            onClick={this._addItem.bind(this)}>
          Add
        </button>
      </div>
    )
  }
}

AddItem.propTypes = {
  placeholder: React.PropTypes.string,
  addItem: React.PropTypes.func.isRequired
}

export default AddItem
