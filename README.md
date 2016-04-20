Logbook
=======================

A simple calendar app designed to act as a logbook. Inspired by the author of [*Steal Like An Artist*](http://austinkleon.com/2010/01/31/logbook/).

Special thanks to [davezuko](https://github.com/davezuko) for providing the boilerplate for this app (see: [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit))


Requirements
------------

Node `^5.0.0`

Features
--------

* [React](https://github.com/facebook/react) (`^0.14.0`)
  * Includes react-addons-test-utils (`^0.14.0`)
* [Redux](https://github.com/gaearon/redux) (`^3.0.0`)
  * react-redux (`^4.0.0`)
  * redux-devtools
    * use `npm run dev:nw` to display them in a separate window.
  * redux-thunk middleware
* [react-router](https://github.com/rackt/react-router) (`^1.0.0`)
* [redux-simple-router](https://github.com/jlongster/redux-simple-router) (`^1.0.0`)
* [Webpack](https://github.com/webpack/webpack)
  * [CSS modules!](https://github.com/css-modules/css-modules)
  * sass-loader
  * postcss-loader with cssnano for style autoprefixing and minification
  * Bundle splitting for app and vendor dependencies
  * CSS extraction during production builds
  * Loaders for fonts and images
* [Express](https://github.com/strongloop/express)
  * webpack-dev-middleware
  * webpack-hot-middleware
* [Karma](https://github.com/karma-runner/karma)
  * Mocha w/ chai, sinon-chai, and chai-as-promised
  * PhantomJS
  * Code coverage reports
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * react-transform-hmr for hot reloading
  * `react-transform-catch-errors` with `redbox-react` for more visible error reporting
  * Uses babel runtime rather than inline transformations
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this!
  * Includes separate test-specific `.eslintrc` to work with Mocha and Chai
* [Mongoose](http://mongoosejs.com/) (`^4.3.4`)
  * MongoDB object modeling
