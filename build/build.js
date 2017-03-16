// https://github.com/shelljs/shelljs
require('./check-versions')()

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')

var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var allSys = require('../allSys.json')

const what = process.argv.slice(2)[0]

process.env.NODE_ENV = 'production'

if (what && allSys[what]) {
  const options = allSys[what]
  config = config(options)
  webpackConfig = webpackConfig(options, config)

  var spinner = ora('building for production...')
  spinner.start()

  var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  shell.rm('-rf', assetsPath)
  shell.mkdir('-p', assetsPath)
  shell.config.silent = true
  shell.cp('-R', 'static/*', assetsPath)
  shell.config.silent = false

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
} else {
  console.log('请输入正确的的系统名(该系统根目录名)，可以查看allSys.js里面的配置项')
  console.log('eg: npm run build zer')
}
