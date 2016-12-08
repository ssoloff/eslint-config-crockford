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

describe('Linting unary operators', () => {
  it('should report a violation when a space appears after a nonword operator', () => {
    const text = source([
      'var a = 1;',
      '+ a;'
    ])
    expect(linting(text)).toReportViolationForRule('space-unary-ops')
  })

  it('should not report a violation when no space appears after a nonword operator', () => {
    const text = source([
      'var a = 1;',
      '+a;'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when no space appears after a word operator', () => {
    const text = source(['typeof{};'])
    expect(linting(text)).toReportViolationForRule('space-unary-ops')
  })

  it('should not report a violation when a space appears after a word operator', () => {
    const text = source(['typeof {};'])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when the prefix increment operator is used', () => {
    const text = source([
      'var a = 1;',
      '++a;'
    ])
    expect(linting(text)).toReportViolationForRule('no-plusplus')
  })

  it('should report a violation when the postfix increment operator is used', () => {
    const text = source([
      'var a = 1;',
      'a++;'
    ])
    expect(linting(text)).toReportViolationForRule('no-plusplus')
  })
})
