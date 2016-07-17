import React from 'react'
import Navbar from '../navbar'
import GoalSettings from './Goals'
import PromptSettings from './Prompts'

const Settings = () => {
  return (
    <div>
      <Navbar />

      <div style={STYLES.container}>
        <div className='row'>

          <div className='col-md-12'>
            <GoalSettings />
          </div>

          <div className='col-md-12'>
            <hr />
          </div>

          <div className='col-md-12'>
            <PromptSettings />
          </div>

          <div className='col-md-12'>
            <hr />
          </div>

        </div>
      </div>
    </div>
  )
}

const STYLES = {
  container: {
    width: '60%',
    borderRadius: 2,
    margin: '0px auto 20px',
    padding: 20,
    backgroundColor: 'white'
  }
}

export default Settings
