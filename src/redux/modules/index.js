import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from './counter'
import entries from './entries'
import prompts from './prompts'
import goals from './goals'

export default combineReducers({
  counter,
  entries,
  prompts,
  goals,
  router: routeReducer
})
