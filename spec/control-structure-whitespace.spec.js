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

describe('Linting control structure whitespace', () => {
  describe('for a for statement', () => {
    it('should report a violation when a space appears before a semi-colon', () => {
      const text = source([
        'var a;',
        'for (a = 1 ; a < 10 ; a += 1) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toReportViolationForRule('semi-spacing')
    })

    it('should report a violation when no space appears after a semi-colon', () => {
      const text = source([
        'var a;',
        'for (a = 1;a < 10;a += 1) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toReportViolationForRule('semi-spacing')
    })

    it('should not report a violation when no space appears before and a space appears after a semi-colon', () => {
      const text = source([
        'var a;',
        'for (a = 1; a < 10; a += 1) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })
})
