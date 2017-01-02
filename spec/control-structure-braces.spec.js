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

describe('Linting control structure braces', () => {
  describe('for an if statement', () => {
    it('should report a violation when braces are absent', () => {
      const text = source([
        'if (1)',
        '    2;'
      ])
      expect(linting(text)).toReportViolationForRule('curly')
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'if (1) {',
        '    2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for an else statement', () => {
    it('should report a violation when braces are absent', () => {
      const text = source([
        'if (1) {',
        '    2;',
        '} else',
        '    3;'
      ])
      expect(linting(text)).toReportViolationForRule('curly')
    })

    it('should not report a violation when braces are present', () => {
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

  describe('for a for statement', () => {
    it('should report a violation when braces are absent', () => {
      const text = source([
        'for (;;)',
        '    1;'
      ])
      expect(linting(text)).toReportViolationForRule('curly')
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'for (;;) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for a for...in statement', () => {
    it('should report a violation when braces are absent', () => {
      const text = source([
        'var p;',
        'for (p in {})',
        '    1;'
      ])
      expect(linting(text)).toReportViolationForRule('curly')
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'var p;',
        'for (p in {}) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for a for...of statement', () => {
    it('should report a violation when braces are absent', () => {
      const text = source([
        'var p;',
        'for (p of [])',
        '    1;'
      ])
      expect(linting(text)).toReportViolationForRule('curly')
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'var p;',
        'for (p of []) {',
        '    1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for a while statement', () => {
    it('should report a violation when braces are absent', () => {
      const text = source([
        'while (1)',
        '    2;'
      ])
      expect(linting(text)).toReportViolationForRule('curly')
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'while (1) {',
        '    2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for a do statement', () => {
    it('should report a violation when braces are absent', () => {
      const text = source([
        'do',
        '    2;',
        'while (1);'
      ])
      expect(linting(text)).toReportViolationForRule('curly')
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'do {',
        '    2;',
        '} while (1);'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for a case label', () => {
    it('should not report a violation when braces are absent', () => {
      const text = source([
        'switch (1) {',
        'case 1:',
        '    2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'switch (1) {',
        'case 1: {',
        '    2;',
        '}',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })

  describe('for a default label', () => {
    it('should not report a violation when braces are absent', () => {
      const text = source([
        'switch (1) {',
        'default:',
        '    2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })

    it('should not report a violation when braces are present', () => {
      const text = source([
        'switch (1) {',
        'default: {',
        '    2;',
        '}',
        '}'
      ])
      expect(linting(text)).toNotReportViolation()
    })
  })
})
