# Crockford - ESLint Shareable Config

[![MIT License][license-image]][license-link]
[![NPM][npm-image]][npm-link]  
[![Build Status][travis-image]][travis-link]
[![Dev Dependency Status][david-dev-image]][david-dev-link]

An ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs) for [Crockford style](http://javascript.crockford.com/code.html).

This shareable config is based on [Douglas Crockford's style guide](http://javascript.crockford.com/code.html), as well as the [JSCS Crockford preset configuration](https://github.com/jscs-dev/node-jscs/blob/master/presets/crockford.json).

## Install

```shell
npm install --save-dev eslint-config-crockford
```

## Usage

Use this shareable config by extending it in your `.eslintrc` file:

```json
{
  "extends": "crockford"
}
```

You can override settings from this shareable config by adding them directly into your `.eslintrc` file.

See the [ESLint documentation](http://eslint.org/docs/developer-guide/shareable-configs#using-a-shareable-config) for more information about using a shareable config.

## License

Licensed under the terms of the [MIT License][license-link].

[david-dev-image]: https://david-dm.org/ssoloff/eslint-config-crockford/dev-status.svg
[david-dev-link]: https://david-dm.org/ssoloff/eslint-config-crockford#info=devDependencies
[license-image]: https://img.shields.io/:license-MIT-blue.svg?style=flat
[license-link]: https://opensource.org/licenses/MIT
[npm-image]: https://img.shields.io/npm/v/eslint-config-crockford.svg
[npm-link]: https://npmjs.org/package/eslint-config-crockford
[travis-image]: https://travis-ci.org/ssoloff/eslint-config-crockford.svg?branch=master
[travis-link]: https://travis-ci.org/ssoloff/eslint-config-crockford
