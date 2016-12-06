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

describe('Linting compound statement brace style', () => {
  it('should report a violation when Stroustrup brace style is used', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '}',
      'else {',
      '    3;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('brace-style')
  })

  it('should report a violation when Allman brace style is used', () => {
    const text = source([
      'if (1)',
      '{',
      '    2;',
      '}',
      'else',
      '{',
      '    3;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('brace-style')
  })

  it('should not report a violation when one true brace style is used', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '} else {',
      '    3;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })

  it('should report a violation when one true brace style is used on a single line', () => {
    const text = source(['if (1) { 2; } else { 3; }'])
    expect(linting(text)).toReportViolationForRule('brace-style')
  })
})
