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

describe('Linting identifier names', () => {
  it('should report a violation when a constructor name is not capitalized', () => {
    const text = source([
      'var o;',
      'function foo() {',
      '    this.bar = 1;',
      '}',
      'o = new foo();'
    ])
    expect(linting(text)).toReportViolationForRule('new-cap')
  })

  it('should not report a violation when a constructor name is capitalized', () => {
    const text = source([
      'var o;',
      'function Foo() {',
      '    this.bar = 1;',
      '}',
      'o = new Foo();'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when an identifier contains a leading underscore', () => {
    const text = source(['var _foo = 1;'])
    expect(linting(text)).toReportViolationForRule('no-underscore-dangle')
  })

  it('should report a violation when an identifier contains a trailing underscore', () => {
    const text = source(['var foo_ = 1;'])
    expect(linting(text)).toReportViolationForRule('no-underscore-dangle')
  })
})
