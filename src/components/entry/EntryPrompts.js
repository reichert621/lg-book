import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import styles from './Entry.scss'
import AddItem from './AddItem.js'

export class EntryPrompts extends React.Component {
  static propTypes = {
    entry: React.PropTypes.object,
    prompts: React.PropTypes.array,
    handleUpdate: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      saving: false,
      _timeout: null
    }
  }

  // TODO: make this better
  triggerSaveTimeout () {
    if (this.state._timeout) {
      clearTimeout(this.state._timeout)
    }

    this.state.saving = true

    this.state._timeout = setTimeout(() => {
      this.handleSave()
      this.state.saving = false
    }, 1000)
  }

  handleEdit (prompt, e) {
    let entry = this.props.entry

    let prompts = this.props.prompts.map((p) => {
      if (p.question === prompt.question) {
        p._answer = e.target.value
      }

      return p
    })

    this.props.handleEdit(entry, { prompts })
    this.triggerSaveTimeout()
  }

  handleSave () {
    let params = {
      prompts: this.props.prompts.map((p) => {
        p.answer = p._answer

        return p
      })
    }

    this.props.handleUpdate(params)
  }

  addPrompt (text) {
    if (!text) return

    const { prompts, handleUpdate } = this.props
    const _prompt = { question: text }
    const params = { prompts: prompts.concat(_prompt) }

    handleUpdate(params)
  }

  render () {
    const style = {
      row: {
        marginBottom: 20
      },
      col: {
        wordWrap: 'break-word'
      },
      container: {
        marginTop: 20
      }
    }

    let prompts = this.props.prompts.map((item) => {
      item._answer = item._answer === undefined ? item.answer : item._answer

      return (
        <div className='row' key={item._id} style={style['row']}>
          <div className={classNames(styles['question-title'], 'col-md-12')}>
            {item.question}
          </div>

          <div className={classNames(styles['question-answer'], 'col-md-12')}>
            <textarea className='form-control'
              value={item._answer}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleEdit.bind(this, item)}>
            </textarea>
          </div>
        </div>
      )
    })

    const lastSavedAt = moment(this.props.entry.updatedAt).format('hh:mm:ss a')
    let _saveText = this.state.saving ? 'Saving...' : `Last saved at ${lastSavedAt}`

    return (
      <div style={style['container']}>
        <div className={classNames(styles['small-text'], 'col-md-12')}>
          {_saveText}
        </div>
        <div className=''>{prompts}</div>

        <AddItem
          placeholder='Enter new question...'
          addItem={this.addPrompt.bind(this)} />
      </div>
    )
  }
}

export default EntryPrompts
