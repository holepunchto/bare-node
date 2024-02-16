const Module = require('module')
const fs = require('fs')

const bare = {
  fs: 'bare-fs',
  http: 'bare-http1',
  os: 'bare-os',
  path: 'bare-path',
  events: 'bare-events',
  url: 'bare-url',
  child_process: 'bare-subprocess',
  readline: 'bare-readline',
  repl: 'bare-repl',
  inspector: 'bare-inspector',
  process: 'bare-process',
  console: 'bare-console',
  tty: 'bare-tty'
}

fs.rmSync('modules', { force: true, recursive: true })
fs.mkdirSync('modules')

const publish = []

let list = ''
let all = '{\n'

all += '  "dependencies": {\n'

for (const name of Module.builtinModules) {
  if (name[0] === '_') continue
  if (name.indexOf('/') > -1) continue

  const v = bare[name] ? '1.0.0' : '0.0.0'
  const compat = 'bare-node-' + name.replace(/_/g, '-')
  const deps = bare[name] ? `"${bare[name]}": "*"` : ''

  if (bare[name]) {
    list += `* \`${name}\`: [\`${bare[name]}\`](https://github.com/holepunchto/${bare[name]}) (through \`npm:${compat})\`\n`
    all += `    "${bare[name]}": "^${require('child_process').execSync('npm view ' + bare[name] + ' version').toString().trim()}",\n`
    all += `    "${name}": "npm:${compat}",\n`
  }

  publish.push(compat)

  fs.mkdirSync('modules/' + compat)
  fs.writeFileSync('modules/' + compat + '/package.json', `{ "name": "${compat}", "version": "${v}", "description": "bare compat for ${name}", "dependencies": {${deps}}, "license": "Apache-2.0" }\n`)

  if (bare[name]) {
    fs.writeFileSync('modules/' + compat + '/index.js', `module.exports = require('${bare[name]}')`)
    if (name === 'fs') fs.writeFileSync('modules/' + compat + '/promises.js', `module.exports = require('${bare[name]}/promises')`)
  }
  else fs.writeFileSync('modules/' + compat + '/index.js', `throw new Error('${name} compat is not yet supported')`)
}

all = all.trim().replace(/,$/g, '') + '\n  }\n}'

if (process.argv.includes('--publish')) {
  for (const name of publish) {
    try {
      require('child_process').spawnSync('npm', ['publish'], { cwd: 'modules/' + name, stdio: 'inherit' })
    } catch {
      // ignore
    }
  }
}

fs.writeFileSync('README.md', fs.readFileSync('README.template.md', 'utf-8').replace('{{list}}', list.trim()).replace('{{all}}', all.trim()))
