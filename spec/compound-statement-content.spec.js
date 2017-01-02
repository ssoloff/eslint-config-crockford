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

describe('Linting compound statement content', () => {
  it('should report a violation when a block is empty', () => {
    const text = source([
      'if (1) {',
      '} else {',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('no-empty')
  })

  it('should not report a violation when a catch block is empty', () => {
    const text = source([
      'try {',
      '    1;',
      '} catch (e) {',
      '}'
    ])
    expect(linting(text)).toNotReportViolation()
  })
})
