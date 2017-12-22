const fs = require('fs')
const path = require('path')
const yfm = require('yaml-front-matter')
const generateFiles = require('./generate-files')

const root = path.resolve(__dirname, '..')
const targetDirectory = path.resolve(root, 'site-src/components')

function isDirectory(filename) {
  return fs.statSync(filename).isDirectory()
}

function findMarkdown (directory) {
  let markdowns = []

  const files = fs.readdirSync(directory)

  files.forEach((name) => {
    const fullPath = path.join(directory, name)

    if (isDirectory(fullPath)) {
      markdowns = markdowns.concat(findMarkdown(fullPath))
    } else if (/\.md$/.test(name) && name.indexOf('__') !== 0) {
      markdowns.push({name, fullPath})
    }
  })

  return markdowns
}

const variables = yfm.loadFront(path.join(root, 'src/components/__variables.zh-CN.md'))

findMarkdown(path.join(root, 'src'))
  .forEach(({name, fullPath}) => {
    console.log(fullPath)
    const target = path.join(targetDirectory, name.replace(/\.md$/, ''))

    generateFiles(fullPath, target, variables)
  })
