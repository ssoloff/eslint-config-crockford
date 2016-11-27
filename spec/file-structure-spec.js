/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const createEngine = require('./support/test-util').createEngine

describe('File structure', () => {
  let engine

  function linting (text) {
    return engine.executeOnText(text)
  }

  beforeEach(() => {
    engine = createEngine()
  })

  it('should raise a violation when the file does not have a trailing newline', () => {
    const text = 'var foo = 1;'
    expect(linting(text)).toReportErrorForRule('eol-last')
  })

  it('should not raise a violation when the file has a trailing newline', () => {
    const text = 'var foo = 1;\n'
    expect(linting(text)).toNotReportViolationForAnyRule()
  })
})
