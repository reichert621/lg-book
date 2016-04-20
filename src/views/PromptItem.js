import React from 'react'

export class PromptItem extends React.Component {
  static propTypes = {
    prompt: React.PropTypes.object,
    updatePrompt: React.PropTypes.func.isRequired,
    removePrompt: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      editText: props.prompt.text
    }
  }

  toggleEditing () {
    if (this.props.prompt.text !== this.state.editText) {
      this.props.updatePrompt({ text: this.state.editText })
    }

    this.setState({ editing: !this.state.editing })
  }

  toggleActive () {
    this.props.updatePrompt({ active: !this.props.prompt.active })
  }

  handleEditText (e) {
    this.setState({ editText: e.target.value })
  }

  handleRemove () {
    this.props.removePrompt()
  }

  render () {
    let { prompt } = this.props
    const styles = {
      prompt: {
        margin: '10px 0px'
      },
      button: {
        marginLeft: 10
      }
    }

    if (this.state.editing) {
      return (
        <div>
          <input type='text' className='form-control'
            ref='editText'
            value={this.state.editText}
            onChange={this.handleEditText.bind(this)}
            onBlur={this.toggleEditing.bind(this)} />
        </div>
      )
    } else {
      return (
        <div className='checkbox' style={styles['prompt']}>
          <input type='checkbox' checked={prompt.active}
                 onChange={this.toggleActive.bind(this)} />
          <span onDoubleClick={this.toggleEditing.bind(this)}>
            {prompt.text}
          </span>

          <button style={styles['button']}
                  className='btn btn-xs btn-danger'
                  onClick={this.handleRemove.bind(this)}>
            Remove
          </button>

        </div>
      )
    }
  }
}

export default PromptItem
