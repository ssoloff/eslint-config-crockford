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

describe('Linting binary operators', () => {
  it('should report a violation when a space does not appear before the operator', () => {
    const text = source(['var a = 1+ 2;'])
    expect(linting(text)).toReportViolationForRule('space-infix-ops')
  })

  it('should report a violation when a space does not appear after the operator', () => {
    const text = source(['var a = 1 +2;'])
    expect(linting(text)).toReportViolationForRule('space-infix-ops')
  })

  it('should report a violation when a space appears before the sequence operator', () => {
    const text = source([
      'var i, j;',
      'for (i = 0 , j = 0; i < 10; ++i, ++j) {',
      '    1;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('comma-spacing')
  })

  it('should report a violation when a space does not appear after the sequence operator', () => {
    const text = source([
      'var i, j;',
      'for (i = 0,j = 0; i < 10; ++i, ++j) {',
      '    1;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('comma-spacing')
  })

  it('should report a violation when the sequence operator is used outside of a for statement', () => {
    const text = source(['1, 2;'])
    expect(linting(text)).toReportViolationForRule('no-sequences')
  })

  it('should report a violation when the coercive equality operator is used', () => {
    const text = source(['1 == 1;'])
    expect(linting(text)).toReportViolationForRule('eqeqeq')
  })

  it('should report a violation when the coercive inequality operator is used', () => {
    const text = source(['1 != 2;'])
    expect(linting(text)).toReportViolationForRule('eqeqeq')
  })
})
