import React from 'react'
import classNames from 'classnames'
import css from './Entry.scss'

const Prompt = ({ prompt, handleEdit }) => {
  const { question, _answer, answer } = prompt

  return (
    <div className='row' style={STYLES['row']}>

      <div className={classNames(css['question-title'], 'col-md-12')}>
        {question}
      </div>

      <div className={classNames(css['question-answer'], 'col-md-12')}>

        <textarea
          className='form-control'
          value={
            _answer === undefined ? answer : _answer
          }
          onChange={handleEdit}>
        </textarea>

      </div>

    </div>
  )
}

const STYLES = {
  row: {
    marginBottom: 20
  }
}

export default Prompt
