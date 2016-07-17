import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import SettingsView from 'components/settings'
// import SettingsView from 'views/SettingsView'
import EntryView from 'views/EntryView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/:year/:month/:day' component={EntryView} />
    <Route path='/:year/:month' component={HomeView} />
    <Route path='/settings' component={SettingsView} />
  </Route>
)
