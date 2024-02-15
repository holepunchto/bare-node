# bare-node

Compat modules for Bare that try to behave like their Node.js counterparts.
Not meant to cover 100% of all APIS but the 95% that everyone uses

Currently supported are

{{list}}

To use easily in a Bare application simply do the following in your package.json

```json
{
  "dependencies": {
    "bare-fs": "^2.1.5",
    "fs": "npm:bare-node-fs"
  }
}
```

The above says you wanna support `require(fs)` with `bare-fs` versioned to 2.1.5.
This means you can even lock down the versions of everthing if you want to!

When writing a module that uses fs you can also choose to specify directly in that
module what fs should map to instead of relying on the compat. You would do that using an import map.

For example Hypercore uses `events` and to work in both bare and node it adds the following import map
to package.json

```json
{
  "imports": {
    "events": {
      "bare": "bare-events",
      "default": "events"
    }
  },
  "optionalDependencies": {
    "bare-events": "^2.2.0"
  }
}
```

Note that this way the module is in FULL control of exactly which version of events it wants to bind to
in Bare.

Say goodbye to broken apps and modules due to Node.js core changes.

To get the full Node.js compat layer that bare currently supports add the following to package.json

```json
{{all}}
```