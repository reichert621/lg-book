import React from 'react'
import css from '../styles/main.scss'

export class EditableItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.object,
    updateItem: React.PropTypes.func.isRequired,
    removeItem: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      editText: props.item.text
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const input = this.refs.editText

      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }

  toggleEditing () {
    const isEditing = !this.state.editing

    this.setState({ editing: isEditing })

    if (!isEditing && (this.props.item.text !== this.state.editText)) {
      this.props.updateItem({ text: this.state.editText })
    }
  }

  toggleActive () {
    this.props.updateItem({ active: !this.props.item.active })
  }

  handleEditText (e) {
    this.setState({ editText: e.target.value })
  }

  handleRemove () {
    this.props.removeItem()
  }

  handleSubmit (e) {
    if (e.which === 13) {
      this.toggleEditing()
    }
  }

  render () {
    let { item } = this.props
    const styles = {
      'item-container': {
        color: item.active ? 'black' : 'grey'
      },
      item: {
        display: 'table-cell',
        verticalAlign: 'middle'
      },
      button: {
        padding: '2px 4px 0px'
      }
    }

    let itemText

    if (this.state.editing) {
      itemText = (
          <input type='text' className='form-control'
            ref='editText'
            value={this.state.editText}
            onChange={this.handleEditText.bind(this)}
            onBlur={this.toggleEditing.bind(this)}
            onKeyDown={this.handleSubmit.bind(this)} />
      )
    } else {
      itemText = (
        <span onDoubleClick={this.toggleEditing.bind(this)}>
          {item.text}
        </span>
      )
    }

    return (
      <div className={css['item-container']} style={styles['item-container']}>
        <div className={css['item-check']} style={styles['item']}>
          <input type='checkbox' checked={item.active}
                 onChange={this.toggleActive.bind(this)} />
        </div>

        <div className={css['item-text']} style={styles['item']}>
          {itemText}
        </div>

        <div className={css['item-remove']} style={styles['item']}>
          <button style={styles['button']}
                  className='btn btn-xs btn-danger'
                  onClick={this.handleRemove.bind(this)}>
            <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
          </button>
        </div>

      </div>
    )
  }
}

export default EditableItem
