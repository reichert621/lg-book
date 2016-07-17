import React from 'react'
import css from '../../styles/main.scss'
// import classNames from 'classnames'

export class EditableText extends React.Component {
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
      this.props.onUpdate({ text: this.state.editText })
    }
  }

  handleEditText (e) {
    this.setState({ editText: e.target.value })
  }

  handleSubmit (e) {
    if (e.which === 13) {
      this.toggleEditing()
    }
  }

  render () {
    const { item } = this.props

    return (
      <div className={css['item-text']} style={STYLES['item']}>
        {
          this.state.editing ? (
            <input type='text' className='form-control'
              ref='editText'
              value={this.state.editText}
              onChange={this.handleEditText.bind(this)}
              onBlur={this.toggleEditing.bind(this)}
              onKeyDown={this.handleSubmit.bind(this)} />
          ) : (
            <span onDoubleClick={this.toggleEditing.bind(this)}>
              {item.text}
            </span>
          )
        }
      </div>
    )
  }
}

EditableText.propTypes = {
  item: React.PropTypes.object,
  onUpdate: React.PropTypes.func.isRequired
}

const STYLES = {
  item: {
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}

export default EditableText
