const gulp = require('gulp')
const shell = require('shelljs')

const projects = Object.keys(require('./allSys'))

// gulp 执行 所有系统的生产打包工作，不用在开发过程中
projects.map(project => {
  gulp.task(project, () => {
    return shell.exec(`npm run build ${project}`)
  })
})

gulp.task('default', projects)
