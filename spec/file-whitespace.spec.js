/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const linting = require('./support/test-util').linting
const source = require('./support/test-util').source

describe('Linting file whitespace', () => {
  it('should report a violation when the file does not have a trailing newline', () => {
    const text = 'var foo = 1;'
    expect(linting(text)).toReportViolationForRule('eol-last')
  })

  it('should not report a violation when the file has a trailing newline', () => {
    const text = 'var foo = 1;\n'
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when a line has trailing whitespace', () => {
    const text = source(['var foo = 1; '])
    expect(linting(text)).toReportViolationForRule('no-trailing-spaces')
  })

  it('should not report a violation when a line does not have trailing whitespace', () => {
    const text = source(['var foo = 1;'])
    expect(linting(text)).toNotReportViolation()
  })
})
