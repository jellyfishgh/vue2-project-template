const fs = require('fs')
const path = require('path')

const what = process.argv.slice(2)[0]

const allSys = require('../allSys.json')
const allSysPath = path.join(__dirname, '../allSys.json')

console.log(allSys[what])

if (!allSys[what]) {
  const projectPath = path.join(__dirname, `../src/${what}`)
  fs.mkdir(projectPath, (err) => {
    if (err) console.log(`${projectPath} 已存在`)
    else console.log(`${projectPath} 创建成功`)
    const templatePath = path.join(__dirname, '../config/project-template')
    copy(path.join(templatePath, 'index.html'), path.join(projectPath, 'index.html'), () => {
      copy(path.join(templatePath, 'main.js'), path.join(projectPath, 'main.js'), () => {
        const appVuePath = path.join(projectPath, 'App.vue')
        fs.writeFile(appVuePath, require(`${templatePath}/vueTemplate.js`)(what), err => {
          if (err) throw err
          console.log(`${appVuePath} 创建成功`)
          allSys[what] = {
            name: what,
            template: `src/${what}/index.html`
          }
          fs.writeFile(allSysPath, JSON.stringify(allSys, null, '  '), err => {
            if (err) throw err
            console.log(`allSys.js 更新成功`)
          })
        })
      })
    })
  })
} else {
  console.log('已存在该项目，不能重复创建')
}

function copy(src, dest, cb) {
  fs.readFile(src, (err, data) => {
    if (err) throw err
    fs.writeFile(dest, data, err => {
      if (err) throw err
      console.log(`${dest} 创建成功`)
      cb()
    })
  })
}
