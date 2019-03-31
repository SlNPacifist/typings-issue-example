# Demonstration of inconvenient ambient modules in typescript

Typings for external modules are located in external-typings. [Recommended template](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-function-d-ts.html) for module exporting function does not work if project uses `typeRoots` options:
```bash
$ npm run build-with-type-roots
...
src/index.ts:1:22 - error TS7016: Could not find a declaration file for module 'asker'. '/typings-issue-example/node_modules/asker/lib/asker.js' implicitly has an 'any' type.
  Try `npm install @types/asker` if it exists or add a new declaration (.d.ts) file containing `declare module 'asker';`

1 import ask = require('asker');
```

When this definition is placed in `node_modules/@types` project compiles successfully:
```bash
$ npm run build-with-symlinked-typings
```

When this project uses `baseUrl` and `paths` options instead of `typeRoots` it also compiles:
```bash
$ npm run build-with-paths
```

Compiling with flag `--traceResolution` shows some difference in declaration file resolution:
* using `typeRoots` config option:
```
$ npm run build-with-type-roots -- --traceResolution
======== Module name 'asker' was successfully resolved to '/typings-issue-example/node_modules/asker/lib/asker.js'. ========
======== Resolving type reference directive 'asker', containing file '/typings-issue-example/__inferred type names__.ts', root directory '/typings-issue-example/external-typings'. ========
======== Type reference directive 'asker' was successfully resolved to '/typings-issue-example/external-typings/asker/index.d.ts', primary: true. ========
src/index.ts:1:22 - error TS7016: Could not find a declaration file for module 'asker'. '/typings-issue-example/node_modules/asker/lib/asker.js' implicitly has an 'any' type.
  Try `npm install @types/asker` if it exists or add a new declaration (.d.ts) file containing `declare module 'asker';`
```
* using `node_modules` symlink:
```
$ npm run build-with-symlinked-typings -- --traceResolution
======== Module name 'asker' was successfully resolved to '/typings-issue-example/external-typings/asker/index.d.ts'. ========
======== Resolving type reference directive 'asker', containing file '/typings-issue-example/__inferred type names__.ts', root directory '/typings-issue-example/external-typings'. ========
======== Type reference directive 'asker' was successfully resolved to '/typings-issue-example/external-typings/asker/index.d.ts', primary: true. ========
```
* using `baseUrl` and `paths` config options:
```
$ npm run build-with-paths -- --traceResolution
======== Resolving module 'asker' from '/typings-issue-example/src/index.ts'. ========
======== Module name 'asker' was successfully resolved to '/typings-issue-example/external-typings/asker/index.d.ts'. ========
```
