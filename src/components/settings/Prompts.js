import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/prompts'
import NewItemInput from '../forms/NewItemInput'
import Prompt from './Prompt'

const mapStateToProps = (state) => ({
  prompts: state.prompts.items,
  fetching: state.prompts.isFetching
})

export class PromptSettings extends React.Component {
  componentDidMount () {
    this.props.fetchPrompts()
  }

  render () {
    const { prompts, removePrompt, updatePrompt, addPrompt } = this.props

    let _prompts = prompts.map((prompt, index) => {
      return (
        <Prompt
          key={index}
          prompt={prompt}
          onRemove={removePrompt.bind(this, prompt._id)}
          onUpdate={updatePrompt.bind(this, prompt._id)} />
      )
    })

    return (
      <div>
        <h1 className='text-center' style={STYLES.title}>
          Prompts
        </h1>

        <NewItemInput
          onSubmit={addPrompt.bind(this)} />

        <div>
          {_prompts}
        </div>

      </div>
    )
  }
}

PromptSettings.propTypes = {
  prompts: React.PropTypes.array,
  fetchPrompts: React.PropTypes.func.isRequired,
  updatePrompt: React.PropTypes.func.isRequired,
  removePrompt: React.PropTypes.func.isRequired,
  addPrompt: React.PropTypes.func.isRequired,
  fetching: React.PropTypes.bool
}

const STYLES = {
  title: { marginBottom: 0 },
  noItems: { fontSize: 16 }
}

export default connect(mapStateToProps, actions)(PromptSettings)
