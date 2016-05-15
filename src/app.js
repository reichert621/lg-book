import React from 'react'
import ReactDOM from 'react-dom'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
import { browserHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'

// const history = createBrowserHistory()
const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(browserHistory, store, (state) => state.router)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={browserHistory} routes={routes} store={store} />,
  document.getElementById('root')
)
