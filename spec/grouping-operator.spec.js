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

describe('Linting grouping operator', () => {
  it('should report a violation when a space appears after the opening parenthesis', () => {
    const text = source(['( 1 + 2);'])
    expect(linting(text)).toReportViolationForRule('space-in-parens')
  })

  it('should report a violation when a space appears before the closing parenthesis', () => {
    const text = source(['(1 + 2 );'])
    expect(linting(text)).toReportViolationForRule('space-in-parens')
  })

  it(
    'should not report a violation when no space appears after the opening parenthesis or before the closing ' +
        'parenthesis',
    () => {
      const text = source(['(1 + 2);'])
      expect(linting(text)).toNotReportViolation()
    }
  )
})
