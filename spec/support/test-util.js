/*
 * Copyright (c) 2016-2017 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const eslint = require('eslint')

function createEngine () {
  return new eslint.CLIEngine({
    configFile: 'lib/eslintrc.json',
    parserOptions: {
      ecmaVersion: 8
    },
    useEslintrc: false
  })
}

module.exports = {
  linting (text) {
    const engine = createEngine()
    return engine.executeOnText(text)
  },

  source (lines) {
    return lines.join('\n') + '\n'
  }
}
