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

describe('Linting keyword usage', () => {
  it('should report a violation when the continue keyword is used', () => {
    const text = source([
      'while (true) {',
      '    continue;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('no-continue')
  })

  it('should report a violation when the with keyword is used', () => {
    const text = source([
      'var o = {};',
      'with (o) {',
      '    1;',
      '}'
    ])
    expect(linting(text)).toReportViolationForRule('no-with')
  })
})
