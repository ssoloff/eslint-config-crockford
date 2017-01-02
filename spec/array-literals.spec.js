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

describe('Linting array literals', () => {
  it('should report a violation when the last element ends with a comma', () => {
    const text = source([
      'var a = [',
      '    1,',
      '    2,',
      '];'
    ])
    expect(linting(text)).toReportViolationForRule('comma-dangle')
  })

  it('should report a violation when a comma does not occur after an element', () => {
    const text = source([
      'var a = [',
      '    1',
      '    , 2',
      '];'
    ])
    expect(linting(text)).toReportViolationForRule('comma-style')
  })

  it('should report a violation when a space is present after the opening bracket', () => {
    const text = source(['var a = [ 1, 2];'])
    expect(linting(text)).toReportViolationForRule('array-bracket-spacing')
  })

  it('should report a violation when a space is present before the closing bracket', () => {
    const text = source(['var a = [1, 2 ];'])
    expect(linting(text)).toReportViolationForRule('array-bracket-spacing')
  })
})
