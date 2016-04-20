import React from 'react'
import { connect } from 'react-redux'
import { fetchPrompts, updatePrompt, addPrompt, removePrompt } from '../redux/modules/prompts'
import PromptItem from './PromptItem.js'

const mapStateToProps = (state) => ({
  prompts: state.prompts.items
})

export class PromptsList extends React.Component {
  static propTypes = {
    prompts: React.PropTypes.array,
    fetchPrompts: React.PropTypes.func.isRequired,
    updatePrompt: React.PropTypes.func.isRequired,
    removePrompt: React.PropTypes.func.isRequired,
    addPrompt: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      newPrompt: ''
    }
  }

  componentDidMount () {
    this.props.fetchPrompts()
  }

  handleChange (e) {
    this.setState({ newPrompt: e.target.value })
  }

  handleSubmit (e) {
    if (e.which === 13) {
      this.props.addPrompt({ text: this.state.newPrompt })
      this.refs.newPrompt.value = ''
    }
  }

  render () {
    let items

    if (this.props.prompts && this.props.prompts.length) {
      items = this.props.prompts.map((item) => {
        return (
          <PromptItem key={item._id} prompt={item}
            updatePrompt={this.props.updatePrompt.bind(this, item._id)}
            removePrompt={this.props.removePrompt.bind(this, item._id)} />
        )
      })
    } else {
      items = <li>No prompts!</li>
    }

    return (
      <div>
        <h1>Prompts</h1>

        <input type='text' className='form-control'
               ref='newPrompt'
               onChange={this.handleChange.bind(this)}
               onKeyDown={this.handleSubmit.bind(this)} />

        <ul>
          {items}
        </ul>

      </div>
    )
  }
}

export default connect(mapStateToProps, {
  fetchPrompts,
  updatePrompt,
  addPrompt,
  removePrompt
})(PromptsList)
