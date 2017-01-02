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

describe('Linting conditional operator', () => {
  it('should report a violation when a space does not appear after the test', () => {
    const text = source(['var a = true? 1 : 2;'])
    expect(linting(text)).toReportViolationForRule('space-infix-ops')
  })

  it('should report a violation when a space does not appear before the consequent', () => {
    const text = source(['var a = true ?1 : 2;'])
    expect(linting(text)).toReportViolationForRule('space-infix-ops')
  })

  it('should report a violation when a space does not appear after the consequent', () => {
    const text = source(['var a = true ? 1: 2;'])
    expect(linting(text)).toReportViolationForRule('space-infix-ops')
  })

  it('should report a violation when a space does not appear before the alternate', () => {
    const text = source(['var a = true ? 1 :2;'])
    expect(linting(text)).toReportViolationForRule('space-infix-ops')
  })

  it(
    'should not report a violation when a space appears after the test, before the consequent, after the ' +
        'consequent, and before the alternate',
    () => {
      const text = source(['var a = true ? 1 : 2;'])
      expect(linting(text)).toNotReportViolation()
    }
  )
})
