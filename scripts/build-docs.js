const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const yfm = require('yaml-front-matter')
const generateFiles = require('./generate-files')
const mt = require('mark-twain')
const fse = require('fs-extra')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const lang = 'zh-CN'
const root = path.resolve(__dirname, '..')
const targetDirectory = path.resolve(root, 'site-src/components')

function isDirectory(filename) {
  return fs.statSync(filename).isDirectory()
}

function findMarkdown (directory, lang) {
  let markdowns = []

  const files = fs.readdirSync(directory)

  files.forEach((name) => {
    const fullPath = path.join(directory, name)

    if (isDirectory(fullPath)) {
      markdowns = markdowns.concat(findMarkdown(fullPath, lang))
    } else if (new RegExp(`\.${lang}\.md$`).test(name) && name.indexOf('__') !== 0) {
      markdowns.push({name, fullPath})
    }
  })

  return markdowns
}

const promises = findMarkdown(path.join(root, 'src/components'), lang)
  .map(({name, fullPath}) => {
    const target = path.join(targetDirectory, name.replace(/\.md$/, ''))

    return generateFiles(fullPath, target)
  })

Promise
  .all(promises)
  .then((docs) => {
    let imports = docs.map((name) => `import _${name} from './${name}.${lang}'`).join('\n')
    let exports = docs.map((name) => `export const ${name} = _${name}`).join('\n')
    exports += `\nexport default [${docs.map((name) => '_' + name).join(',')}]`
    writeFile(path.join(targetDirectory, 'index.js'), [imports, exports].join('\n'), 'utf8')
  })

const docPromises = findMarkdown(path.join(root, 'src/docs'), lang)
  .map((file) => {
    return readFile(file.fullPath, 'utf8')
      .then((source) => mt(source))
      .then((source) => {
        const targetPath = path.join(root, 'site-src/docs', file.name.replace('.md', '.js'))
        const content = `export default ${JSON.stringify(source.content)}`
        return writeFile(targetPath, content, 'utf8')
      })
  })

fse.mkdirp(path.join(root, 'site-src/docs')).then(() => Promise.all(docPromises))
