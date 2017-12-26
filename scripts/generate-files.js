const promisify = require('util').promisify
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const mt = require('mark-twain')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

function randomString () {
  return Math.random().toString().slice(2)
}

module.exports = function (sourceFile, targetDir, variables = {}) {
  return fse.mkdirp(targetDir)
    .then(() => readFile(sourceFile, 'utf8'))
    .then((source) => source.replace(/{{([^}]+)}}/g, (_, w) => variables[w]))
    .then((source) => mt(source))
    .then((source) => {
      const promises = []

      const meta = source.meta
      const descriptions = []
      const demos = []
      const apis = []

      source.content.forEach(section => {
        if (!Array.isArray(section)) {
          return
        }

        const [type, content, extra] = section
        const demo = demos.length && demos[demos.length - 1]


        if (type === 'h2') {
          if (content !== 'API') {
            demos.push({
              key: randomString(),
              title: content,
              description: ['article']
            })
          }

        } else if (type === 'p') {
          if (demo) {
            demo.description.push(section)
          }

        } else if (type === 'table') {
          apis.push({key:randomString(), table: section})

        } else if (type === 'pre' && content && content.lang === 'js') {
          const code = extra[1]
          const name = `${meta.title}${demos.length}` // randomString()

          if (demo) {
            demo.name = name
            demo.raw = code
            demo.component = `{{${name}}}`
          }

          promises.push(
            writeFile(path.join(targetDir, `${name}.js`), code, 'utf8')
          )

        } else {
          descriptions.push(section)
        }
      })

      const json = JSON.stringify({meta, descriptions, demos, apis}, null, 2)

      const indexContent = demos
        .filter((demo) => Boolean(demo.name))
        .map((demo) => `import ${demo.name} from './${demo.name}'`)
        .join(';\n')
        .concat(`;\n\nexport default ${json.replace(/"{{([^}]+)}}"/g, '$1')}`)

      promises.push(
        writeFile(path.join(targetDir, 'index.js'), indexContent, 'utf8')
      )

      return Promise.all(promises).then(() => meta.title)
    })
}
