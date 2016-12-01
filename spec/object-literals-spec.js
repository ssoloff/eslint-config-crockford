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

describe('Linting object literals', () => {
  it('should report a violation when the last property ends with a comma', () => {
    const text = source([
      'var o = {',
      '    a: 1,',
      '    b: 2,',
      '};'
    ])
    expect(linting(text)).toReportViolationForRule('comma-dangle')
  })

  it('should report a violation when a comma does not occur after a property', () => {
    const text = source([
      'var o = {',
      '    a: 1',
      '    , b: 2',
      '};'
    ])
    expect(linting(text)).toReportViolationForRule('comma-style')
  })

  it('should report a violation when a space is present before the colon between the key and value', () => {
    const text = source([
      'var o = {',
      '    a : 1',
      '};'
    ])
    expect(linting(text)).toReportViolationForRule('key-spacing')
  })

  it('should report a violation when a space is not present after the colon between the key and value', () => {
    const text = source([
      'var o = {',
      '    a:1',
      '};'
    ])
    expect(linting(text)).toReportViolationForRule('key-spacing')
  })
})
