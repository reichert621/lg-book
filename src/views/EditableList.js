import React from 'react'
import EditableItem from './EditableItem.js'
// TODO: store in different css file
import styles from './EntryView.scss'

export class EditableList extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    items: React.PropTypes.array,
    addItem: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    removeItem: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      newItem: ''
    }
  }

  handleChange (e) {
    this.setState({ newItem: e.target.value })
  }

  handleSubmit (e) {
    if (e.which === 13) {
      this.addItem()
    }
  }

  addItem () {
    this.props.addItem({ text: this.state.newItem })
    this.refs.newItem.value = ''
  }

  render () {
    const style = {
      title: { marginBottom: 0 },
      noItems: { fontSize: 16 }
    }

    let items

    if (this.props.items && this.props.items.length) {
      items = this.props.items.map((item) => {
        return (
          <EditableItem key={item._id} item={item}
            updateItem={this.props.updateItem.bind(this, item._id)}
            removeItem={this.props.removeItem.bind(this, item._id)} />
        )
      })
    } else {
      items = (
        <div className='text-center' style={style.noItems}>
          No items!
        </div>
      )
    }

    return (
      <div>
        <h1 className='text-center' style={style.title}>
          {this.props.title}
        </h1>

        <div className={styles['input-add-item']}>
          <input type='text' className='form-control' ref='newItem'
              placeholder='Enter new item...'
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.handleSubmit.bind(this)} />
          <button className='btn'
              onClick={this.addItem.bind(this)}>
            Add
          </button>
        </div>

        <div>
          {items}
        </div>

      </div>
    )
  }
}

export default EditableList
