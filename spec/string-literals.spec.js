/*
 * Copyright (c) 2016-2017 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const linting = require('./support/test-util').linting
const source = require('./support/test-util').source

describe('Linting string literals', () => {
  it('should report a violation when a multiline string literal is used', () => {
    const text = source([
      'var s = "This is a \\',
      'long line.";'
    ])
    expect(linting(text)).toReportViolationForRule('no-multi-str')
  })

  it('should not report a violation when a multiline string template literal is used', () => {
    const text = source([
      'var s = `This is a ',
      'long line.`;'
    ])
    expect(linting(text)).toNotReportViolation()
  })
})
