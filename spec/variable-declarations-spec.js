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

describe('Linting variable declarations', () => {
  it('should report a violation when var declarations are not first in function scope', () => {
    const text = source([
      'while (1) {',
      '    var foo = 1;',
      '    foo;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('vars-on-top')
  })

  it('should not report a violation when var declarations are first in function scope', () => {
    const text = source([
      'var foo = 1;',
      'while (1) {',
      '    foo;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })
})
