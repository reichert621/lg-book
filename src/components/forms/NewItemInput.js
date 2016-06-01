import React from 'react'
import styles from '../../styles/main.scss'

export class NewItemInput extends React.Component {
  constructor (props) {
    super(props)
  }

  handleKeyDown (e) {
    if (e.which === 13) {
      this.handleSubmit()
    }
  }

  handleSubmit () {
    const text = this.refs.itemText.value

    if (text && text.length) {
      this.props.onSubmit({ text: text })
      this.refs.itemText.value = ''
    }
  }

  render () {
    return (
      <div className={styles['input-add-item']}>
        <input type='text' className='form-control' ref='itemText'
            placeholder='Enter new item...'
            onKeyDown={this.handleKeyDown.bind(this)} />
        <button className='btn'
            onClick={this.handleSubmit.bind(this)}>
          Add
        </button>
      </div>
    )
  }
}

NewItemInput.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default NewItemInput
