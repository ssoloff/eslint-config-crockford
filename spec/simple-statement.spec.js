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

describe('Linting simple statements', () => {
  it('should report a violation when a simple statement does not have a trailing semicolon', () => {
    const text = source([
      'var foo = 1'
    ])
    expect(linting(text)).toReportViolationForRule('semi')
  })
})
