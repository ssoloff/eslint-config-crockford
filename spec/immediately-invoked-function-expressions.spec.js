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

describe('Linting immediately-invoked function expressions', () => {
  it('should report a violation when the expression is not wrapped in parentheses', () => {
    const text = source([
      'var foo = function () {',
      '    1;',
      '}();'
    ])
    expect(linting(text)).toReportViolationForRule('wrap-iife')
  })

  it('should not report a violation when the call expression is wrapped in parentheses', () => {
    const text = source([
      'var foo = (function () {',
      '    1;',
      '}());'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when the function expression is wrapped in parentheses', () => {
    const text = source([
      'var foo = (function () {',
      '    1;',
      '})();'
    ])
    expect(linting(text)).toReportViolationForRule('wrap-iife')
  })
})
