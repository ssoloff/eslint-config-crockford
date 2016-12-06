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
  it('should report a violation when var declarations are not first in scope', () => {
    const text = source([
      'while (1) {',
      '    var foo = 1;',
      '    foo;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('vars-on-top')
  })

  it('should not report a violation when var declarations are first in scope', () => {
    const text = source([
      'var foo = 1;',
      'while (1) {',
      '    foo;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when multiple var declarations are used in same scope', () => {
    const text = source([
      'var foo = 1;',
      'var bar = 2;',
      'while (foo) {',
      '    bar;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('one-var')
  })

  it('should not report a violation when a single var declaration is used', () => {
    const text = source([
      'var foo = 1,',
      '    bar = 2;',
      'while (foo) {',
      '    bar;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when a comma does not occur after a variable declaration', () => {
    const text = source([
      'var foo = 1',
      '    , bar = 2;'
    ])
    expect(linting(text)).toReportViolationForRule('comma-style')
  })
})
