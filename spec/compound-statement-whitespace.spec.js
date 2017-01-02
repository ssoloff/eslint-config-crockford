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

describe('Linting compound statement whitespace', () => {
  it('should report a violation when no space appears before the opening brace of a block', () => {
    const text = source([
      'if (1){',
      '    2;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('space-before-blocks')
  })

  it('should not report a violation when a space appears before the opening brace of a block', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })
})
