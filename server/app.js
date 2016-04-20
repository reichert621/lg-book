import express from 'express'
import bodyParser from 'body-parser'
import historyApiFallback from 'connect-history-api-fallback'
import mongoose from 'mongoose'
import config from '../config'
import Promise from 'bluebird'

import { routes } from './routes/api.js'

const app = express()
const debug = require('debug')('app:server')
const paths = config.utils_paths

mongoose.connect(config.mongo_db)
mongoose.Promise = Promise

app.use(bodyParser.json())

routes(app)

app.use(historyApiFallback({
  verbose: false
}))

// Serve app with Webpack if HMR is enabled
if (config.compiler_enable_hmr) {
  const webpack = require('webpack')
  const webpackConfig = require('../build/webpack')
  const compiler = webpack(webpackConfig)

  app.use(require('./middleware/webpack-dev')({
    compiler,
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('./middleware/webpack-hmr')({ compiler }))
} else {
  debug(
    'Application is being run outside of development mode.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)))
}

export default app
