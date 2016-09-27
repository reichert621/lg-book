import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import css from './Entry.scss'
import AddItem from './AddItem.js'
import Prompt from './Prompt.js'

export class EntryPrompts extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      saving: false,
      _timeout: null
    }
  }

  // TODO: make this better, this is essentially doing _.debounce(?)
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
    const { entry, prompts, handleEdit } = this.props

    const _prompts = prompts.map(p => {
      if (p.question === prompt.question) {
        p._answer = e.target.value
      }

      return p
    })

    handleEdit(entry, { prompts: _prompts })

    this.triggerSaveTimeout()
  }

  handleSave () {
    const { prompts, handleUpdate } = this.props

    const params = {
      prompts: prompts.map(p => {
        p.answer = p._answer

        return p
      })
    }

    handleUpdate(params)
  }

  addPrompt (text) {
    if (!text) return

    const { prompts, handleUpdate } = this.props
    const _prompt = { question: text }
    const params = { prompts: prompts.concat(_prompt) }

    handleUpdate(params)
  }

  render () {
    const { prompts, entry } = this.props
    const lastSavedAt = moment(entry.updatedAt).format('hh:mm:ss a')
    const saveText = this.state.saving ? 'Saving...' : `Last saved at ${lastSavedAt}`

    return (
      <div style={STYLES['container']}>

        <div className={classNames(css['small-text'], 'col-md-12')}>
          {saveText}
        </div>

        <div className=''>
          {
            prompts.map(p =>
              <Prompt
                key={p._id}
                prompt={p}
                handleEdit={this.handleEdit.bind(this, p)} />
            )
          }
        </div>

        <AddItem
          placeholder='Enter new question...'
          addItem={this.addPrompt.bind(this)} />

      </div>
    )
  }
}

EntryPrompts.propTypes = {
  entry: React.PropTypes.object,
  prompts: React.PropTypes.array,
  handleUpdate: React.PropTypes.func.isRequired,
  handleEdit: React.PropTypes.func.isRequired
}

const STYLES = {
  row: {
    marginBottom: 20
  },
  container: {
    marginTop: 20
  }
}

export default EntryPrompts
