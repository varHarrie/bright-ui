const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const yfm = require('yaml-front-matter')
const generateFiles = require('./generate-files')

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

const variables = yfm.loadFront(path.join(root, `src/components/__variables.${lang}.md`))

const promises = findMarkdown(path.join(root, 'src'), lang)
  .map(({name, fullPath}) => {
    const target = path.join(targetDirectory, name.replace(/\.md$/, ''))

    return generateFiles(fullPath, target, variables)
  })

Promise
  .all(promises)
  .then((docs) => {
    let imports = docs.map((name) => `import _${name} from './${name}.${lang}'`).join('\n')
    let exports = docs.map((name) => `export const ${name} = _${name}`).join('\n')
    exports += `\nexport default [${docs.map((name) => '_' + name).join(',')}]`
    writeFile(path.join(targetDirectory, 'index.js'), [imports, exports].join('\n'), 'utf8')
  })
