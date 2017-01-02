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

describe('Linting property access', () => {
  it('should report a violation when using square-bracket notation', () => {
    const text = source([
      'var foo = {};',
      'foo["bar"];'
    ])
    expect(linting(text)).toReportViolationForRule('dot-notation')
  })

  it('should not report a violation when using dot notation', () => {
    const text = source([
      'var foo = {};',
      'foo.bar;'
    ])
    expect(linting(text)).toNotReportViolation()
  })
})
