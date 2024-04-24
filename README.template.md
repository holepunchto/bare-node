# bare-node

Compatibility modules for Bare that try to behave like their Node.js counterparts. Not meant to cover 100% of all APIs but the 95% that everyone uses.

## Usage

To use any of the supported Node.js builtins, such as `fs`, in a Bare application run the following:

```
npm i bare-fs fs@npm:bare-node-fs
```

This will add something like the following to your `package.json`:

```json
{
  "dependencies": {
    "bare-fs": "^2.1.5",
    "fs": "npm:bare-node-fs"
  }
}
```

The only thing the wrapper does is `module.exports = require('bare-fs')` and at version `*`, meaning the version you specify is the one that wins. Using the wrapper saves you space as it means npm will only include `bare-fs` once even if multiple modules depend on it.

### Import maps

When writing a module that uses a Node.js builtin, such as `fs`, you can also choose to specify directly in that module what builtin should map to instead of relying on the compatibility layer. You would do that using an import map by adding the following to your `package.json`:

```json
{
  "imports": {
    "fs": {
      "bare": "bare-fs",
      "default": "fs"
    },
    "fs/*": {
      "bare": "bare-fs/*",
      "default": "fs/*"
    }
  },
  "optionalDependencies": {
    "bare-fs": "^2.1.5"
  }
}
```

This way your module is in full control of exactly which version of the builtin it wants to bind to in Bare. If you can, this is the best option as it provides the best of all worlds; Node.js compatible, but full control of your dependencies.

Say goodbye to broken apps and modules due to Node.js core changes.

## Modules

{{#modules}}
{{#compatibility}}
* `{{name}}`: [`{{compatibility}}`](https://github.com/holepunchto/{{compatibility}}) (through [`npm:{{wrapper}}`](https://www.npmjs.com/package/{{wrapper}}))
{{/compatibility}}
{{/modules}}

## License

Apache-2.0
