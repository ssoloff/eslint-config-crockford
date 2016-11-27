/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const eslint = require('eslint')

module.exports = {
  createEngine () {
    return new eslint.CLIEngine({
      configFile: 'src/eslintrc.json',
      parserOptions: {
        ecmaVersion: 8
      },
      useEslintrc: false
    })
  },

  source (lines) {
    return lines.join('\n') + '\n'
  }
}
