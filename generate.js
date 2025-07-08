import * as Module from 'module'
import * as fs from 'fs'
import * as path from 'path'
import pacote from 'pacote'
import prettier from 'prettier'

const compatibility = {
  assert: 'bare-assert',
  async_hooks: 'bare-async-hooks',
  buffer: 'bare-buffer',
  child_process: 'bare-subprocess',
  console: 'bare-console',
  crypto: 'bare-crypto',
  dgram: 'bare-dgram',
  dns: 'bare-dns',
  events: 'bare-events',
  fs: 'bare-fs',
  http: 'bare-http1',
  https: 'bare-https',
  inspector: 'bare-inspector',
  module: 'bare-module',
  net: 'bare-net',
  os: 'bare-os',
  path: 'bare-path',
  perf_hooks: 'bare-performance',
  process: 'bare-process',
  querystring: 'bare-querystring',
  readline: 'bare-readline',
  repl: 'bare-repl',
  stream: 'bare-stream',
  string_decoder: 'text-decoder',
  timers: 'bare-timers',
  tls: 'bare-tls',
  tty: 'bare-tty',
  url: 'bare-url',
  util: 'bare-utils',
  vm: 'bare-vm',
  worker_threads: 'bare-worker',
  zlib: 'bare-zlib'
}

const modules = {}

const builtins = [...Module.builtinModules]
  .filter((builtin) => !builtin.startsWith('_'))
  .map((builtin) => builtin.replace(/^node:/, ''))
  .sort()

for (const builtin of builtins) {
  const [name, subpath = null] = builtin.split('/')

  let module = modules[name] || null

  if (module === null) {
    module = modules[name] = {
      name,
      subpaths: [],
      wrapper: `bare-node-${name.replace(/_/g, '-')}`,
      compatibility: name in compatibility ? compatibility[name] : null
    }
  }

  if (subpath) module.subpaths.push(subpath)
}

const options = await prettier.resolveConfig(import.meta.url)

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
    files: ['index.js'],
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

  let filepath

  filepath = path.join(dir, 'index.js')

  fs.writeFileSync(
    filepath,
    await prettier.format(code, { ...options, filepath })
  )

  for (const subpath of mod.subpaths) {
    pkg.exports[`./${subpath}`] = `./${subpath}.js`

    pkg.files.push(`${subpath}.js`)

    let code

    if (mod.compatibility) {
      code = `module.exports = require('${mod.compatibility}/${subpath}')\n`
    } else {
      code = `throw new Error('\\'${mod.name}/${subpath}\\' compatibility is not yet supported')\n`
    }

    filepath = path.join(dir, `${subpath}.js`)

    fs.writeFileSync(
      filepath,
      await prettier.format(code, { ...options, filepath })
    )
  }

  filepath = path.join(dir, 'package.json')

  fs.writeFileSync(
    filepath,
    await prettier.format(JSON.stringify(pkg), { ...options, filepath })
  )

  for (const file of ['LICENSE', 'NOTICE']) {
    fs.copyFileSync(file, path.join(dir, file))
  }

  filepath = path.join(dir, 'README.md')

  fs.writeFileSync(
    filepath,
    await prettier.format(
      `\
# ${mod.wrapper}

Bare compatibility wrapper for the Node.js builtin \`${mod.name}\` module.

\`\`\`
npm i ${mod.compatibility ? `${mod.compatibility} ${mod.name}@npm:${mod.wrapper}` : `${mod.name}@npm:${mod.wrapper}`}
\`\`\`

## License

Apache-2.0
`,
      { ...options, filepath }
    )
  )
}
