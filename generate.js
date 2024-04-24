const Module = require('module')
const fs = require('fs')
const path = require('path')

const compatibility = {
  assert: 'bare-assert',
  buffer: 'bare-buffer',
  child_process: 'bare-subprocess',
  console: 'bare-console',
  events: 'bare-events',
  fs: 'bare-fs',
  http: 'bare-http1',
  https: 'bare-https',
  inspector: 'bare-inspector',
  os: 'bare-os',
  path: 'bare-path',
  process: 'bare-process',
  readline: 'bare-readline',
  repl: 'bare-repl',
  timers: 'bare-timers',
  tls: 'bare-tls',
  tty: 'bare-tty',
  url: 'bare-url',
  worker_threads: 'bare-worker'
}

const modules = {}

for (const builtin of [...Module.builtinModules].sort()) {
  if (builtin.startsWith('_')) continue

  const [name, subpath = null] = builtin.split('/')

  const mod = modules[name] || (modules[name] = {
    name,
    subpaths: []
  })

  if (subpath) mod.subpaths.push(subpath)
}

const list = []
const dependencies = {}

for (const mod of Object.values(modules)) {
  const name = mod.name.replace(/_/g, '-')

  const dir = path.join('npm', name)

  fs.mkdirSync(dir, { force: true, recursive: true })

  let existing
  try {
    existing = require(path.resolve(dir, 'package.json'))
  } catch {
    existing = {
      version: mod.name in compatibility ? '1.0.0' : '0.0.0'
    }
  }

  const pkg = {
    name: `bare-node-${name}`,
    version: existing.version,
    description: `Bare compatibility wrapper for the Node.js builtin \`${mod.name}\` module`,
    exports: {
      '.': './index.js'
    },
    files: [
      'index.js'
    ],
    repository: {
      type: 'git',
      url: 'git+https://github.com/holepunchto/bare-node.git'
    },
    author: 'Holepunch',
    license: 'Apache-2.0',
    bugs: {
      url: 'https://github.com/holepunchto/bare-node/issues'
    },
    homepage: 'https://github.com/holepunchto/bare-node#readme'
  }

  let index

  if (mod.name in compatibility) {
    const compat = compatibility[mod.name]

    list.push(
      `* \`${mod.name}\`: [\`${compat}\`](https://github.com/holepunchto/${compat}) (through \`npm:bare-node-${name}\`)`
    )

    dependencies[compat] = `^${require('child_process').execSync(`npm view ${compat} version`).toString().trim()}`

    dependencies[mod.name] = `npm:bare-node-${name}`

    pkg.dependencies = {
      [compatibility[mod.name]]: '*'
    }

    index = `module.exports = require('${compatibility[mod.name]}')\n`
  } else {
    index = `throw new Error('\\'${mod.name}\\' compatibility is not yet supported')\n`
  }

  fs.writeFileSync(path.join(dir, 'index.js'), index)

  for (const subpath of mod.subpaths) {
    pkg.exports[`./${subpath}`] = `./${subpath}.js`

    pkg.files.push(`${subpath}.js`)

    fs.writeFileSync(path.join(dir, `${subpath}.js`), `module.exports = require('${compatibility[mod.name]}/${subpath}')\n`)
  }

  fs.writeFileSync(path.join(dir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`)

  for (const file of ['LICENSE', 'NOTICE']) {
    fs.copyFileSync(file, path.join(dir, file))
  }
}

fs.writeFileSync('README.md', fs.readFileSync('README.template.md', 'utf-8')
  .replace('{{list}}', list.join('\n'))
  .replace('{{all}}', JSON.stringify({ dependencies }, null, 2))
)
