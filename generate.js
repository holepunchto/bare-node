import * as Module from 'module'
import * as fs from 'fs'
import * as path from 'path'
import pacote from 'pacote'
import mustache from 'mustache'

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
  module: 'bare-module',
  os: 'bare-os',
  path: 'bare-path',
  process: 'bare-process',
  readline: 'bare-readline',
  repl: 'bare-repl',
  stream: 'bare-stream',
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
    subpaths: [],
    wrapper: `bare-node-${name.replace(/_/g, '-')}`,
    compatibility: name in compatibility ? compatibility[name] : null
  })

  if (subpath) mod.subpaths.push(subpath)
}

for (const mod of Object.values(modules)) {
  const dir = path.join('npm', mod.wrapper.replace('bare-node-', ''))

  fs.mkdirSync(dir, { force: true, recursive: true })

  let existing
  try {
    existing = await pacote.manifest(path.resolve(dir))
  } catch (err) {
    existing = {
      version: mod.compatibility ? '1.0.0' : '0.0.0'
    }
  }

  const pkg = {
    name: mod.wrapper,
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

  let code

  if (mod.compatibility) {
    pkg.dependencies = { [mod.compatibility]: '*' }

    code = `module.exports = require('${compatibility[mod.name]}')\n`
  } else {
    code = `throw new Error('\\'${mod.name}\\' compatibility is not yet supported')\n`
  }

  fs.writeFileSync(path.join(dir, 'index.js'), code)

  for (const subpath of mod.subpaths) {
    pkg.exports[`./${subpath}`] = `./${subpath}.js`

    pkg.files.push(`${subpath}.js`)

    let code

    if (mod.compatibility) {
      code = `module.exports = require('${mod.compatibility}/${subpath}')\n`
    } else {
      code = `throw new Error('\\'${mod.name}/${subpath}\\' compatibility is not yet supported')\n`
    }

    fs.writeFileSync(path.join(dir, `${subpath}.js`), code)
  }

  fs.writeFileSync(path.join(dir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`)

  for (const file of ['LICENSE', 'NOTICE']) {
    fs.copyFileSync(file, path.join(dir, file))
  }

  fs.writeFileSync(path.join(dir, 'README.md'), `\
# ${mod.wrapper}

Bare compatibility wrapper for the Node.js builtin \`${mod.name}\` module.

\`\`\`
npm i ${mod.compatibility ? `${mod.compatibility} ${mod.name}@npm:${mod.wrapper}` : `${mod.name}@npm:${mod.wrapper}`}
\`\`\`

## License

Apache-2.0
`
  )
}

fs.writeFileSync('README.md', mustache.render(fs.readFileSync('README.template.md', 'utf8'), {
  modules: Object.values(modules)
}))
