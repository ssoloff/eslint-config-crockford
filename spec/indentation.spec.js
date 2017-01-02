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

describe('Linting indentation', () => {
  it('should report a violation when both spaces and tabs are used', () => {
    const text = source(['\t    var foo = 1;'])
    expect(linting(text)).toReportViolationForRule('no-mixed-spaces-and-tabs')
  })

  it('should not report a violation when only spaces are used', () => {
    const text = source(['        var foo = 1;'])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when 2 spaces are used', () => {
    const text = source([
      'if (1) {',
      '  2;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('indent')
  })

  it('should report a violation when tabs are used', () => {
    const text = source([
      'if (1) {',
      '\t2;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('indent')
  })

  it('should not report a violation when 4 spaces are used', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when a case label is not aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      '    case 2:',
      '        3;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('indent')
  })

  it('should not report a violation when a case label is aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      'case 2:',
      '    3;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when a default label is not aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      '    default:',
      '        2;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('indent')
  })

  it('should not report a violation when a default label is aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      'default:',
      '    2;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })
})
