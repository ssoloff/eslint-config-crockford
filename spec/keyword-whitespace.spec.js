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

describe('Linting keyword whitespace', () => {
  it('should report a violation when no space appears before a keyword', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '}else {',
      '    3;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('keyword-spacing')
  })

  it('should report a violation when no space appears after a keyword', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '} else{',
      '    3;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('keyword-spacing')
  })

  it('should notreport a violation when a space appears before and after a keyword', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '} else {',
      '    3;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })
})
