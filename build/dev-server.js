require('./check-versions')()

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')

var config = require('../config')
var allSys = require('../allSys.json')

const what = process.argv.slice(2)[0]

if (what && allSys[what]) {
  const options = allSys[what]
  config = config(options)
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  }
  var webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')
  webpackConfig = webpackConfig(options, config)
  // default port where dev server listens for incoming traffic
  var port = process.env.PORT || config.dev.port
  // automatically open browser, if not set will be false
  var autoOpenBrowser = !!config.dev.autoOpenBrowser
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  var proxyTable = config.dev.proxyTable

  var app = express()
  var compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
  })
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({
        action: 'reload'
      })
      cb()
    })
  })

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    console.log(context, options)
    if (typeof options === 'string') {
      options = {
        target: options
      }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // serve pure static assets
  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
  app.use(staticPath, express.static('./static'))

  var uri = `http://localhost:${port}/${options.name}`

  devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n')
  })

  module.exports = app.listen(port, function (err) {
    if (err) {
      console.log(err)
      return
    }

    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
  })
} else {
  console.log('请输入你要打包的系统名(该系统根目录名)')
  console.log('eg: npm run dev zer')
}
