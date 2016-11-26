/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const eslint = require('eslint')

describe('Sylistic issues rule', () => {
  let engine

  function linting (text) {
    return engine.executeOnText(text)
  }

  beforeEach(() => {
    engine = new eslint.CLIEngine({
      configFile: 'src/eslintrc.json',
      useEslintrc: false
    })
  })

  describe('eol-last', () => {
    it('should report an error when the text has a trailing newline', () => {
      const text = 'var foo = 1;'
      expect(linting(text)).toReportErrorForRule('eol-last')
    })

    it('should not report a violation when the text does not have a trailing newline', () => {
      const text = 'var foo = 1;\n'
      expect(linting(text)).toNotReportViolationForRule('eol-last')
    })
  })
})
