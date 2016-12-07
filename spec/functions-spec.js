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

describe('Linting functions', () => {
  describe('for named functions', () => {
    it('should report a violation when a space appears before the opening parenthesis', () => {
      const text = source([
        'function foo (a) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toReportViolationForRule('space-before-function-paren')
    })

    it('should not report a violation when no space appears before the opening parenthesis', () => {
      const text = source([
        'function foo(a) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })

    it('should report a violation when a function is used before it is defined', () => {
      const text = source([
        'foo();',
        'function foo() {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toReportViolationForRule('no-use-before-define')
    })
  })

  describe('for anonymous functions', () => {
    it('should report a violation when no space appears before the opening parenthesis', () => {
      const text = source([
        'var foo = function(a) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toReportViolationForRule('space-before-function-paren')
    })

    it('should not report a violation when a space appears before the opening parenthesis', () => {
      const text = source([
        'var foo = function (a) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for function arguments', () => {
    it('should report a violation when no space appears between arguments', () => {
      const text = source([
        'function foo(a,b) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toReportViolationForRule('comma-spacing')
    })

    it('should not report a violation when space appears between arguments', () => {
      const text = source([
        'function foo(a, b) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })
})
