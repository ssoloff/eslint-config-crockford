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

describe('Linting built-in objects', () => {
  it('should report a violation when the eval() function is used explicitly', () => {
    const text = source(['eval("1 + 1;");'])
    expect(linting(text)).toReportViolationForRule('no-eval')
  })

  it('should report a violation when the eval() function is used implicitly', () => {
    const text = source([
      '/* eslint-env browser */',
      'setTimeout("1 + 1;", 1000);'
    ])
    expect(linting(text)).toReportViolationForRule('no-implied-eval')
  })

  it('should report a violation when the Function constructor is used', () => {
    const text = source(['var foo = new Function("a", "b", "return a + b;");'])
    expect(linting(text)).toReportViolationForRule('no-new-func')
  })
})
