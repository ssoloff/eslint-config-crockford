/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const eslint = require('eslint')

describe('Control structure curly brace presence', () => {
  let engine

  function linting (text) {
    return engine.executeOnText(text)
  }

  function source (lines) {
    return lines.join('\n') + '\n'
  }

  beforeEach(() => {
    engine = new eslint.CLIEngine({
      configFile: 'src/eslintrc.json',
      parserOptions: {
        ecmaVersion: 8
      },
      useEslintrc: false
    })
  })

  describe('for an if statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'if (1)',
        '  2;'
      ])
      expect(linting(text)).toReportErrorForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'if (1) {',
        '  2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for an else statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'if (1) {',
        '  2;',
        '} else',
        '  3;'
      ])
      expect(linting(text)).toReportErrorForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'if (1) {',
        '  2;',
        '} else {',
        '  3;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for a for statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'for (;;)',
        '  1;'
      ])
      expect(linting(text)).toReportErrorForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'for (;;) {',
        '  1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for a for...in statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'var p;',
        'for (p in {})',
        '  1;'
      ])
      expect(linting(text)).toReportErrorForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'var p;',
        'for (p in {}) {',
        '  1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for a for...of statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'var p;',
        'for (p of [])',
        '  1;'
      ])
      expect(linting(text)).toReportErrorForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'var p;',
        'for (p of []) {',
        '  1;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for a while statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'while (1)',
        '  2;'
      ])
      expect(linting(text)).toReportErrorForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'while (1) {',
        '  2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for a do...while statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'do',
        '  2;',
        'while (1);'
      ])
      expect(linting(text)).toReportErrorForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'do {',
        '  2;',
        '} while (1);'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for a case label', () => {
    it('should not raise a violation when curly braces are absent', () => {
      const text = source([
        'switch (1) {',
        'case 1:',
        '  2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'switch (1) {',
        'case 1: {',
        '  2;',
        '}',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })

  describe('for a default label', () => {
    it('should not raise a violation when curly braces are absent', () => {
      const text = source([
        'switch (1) {',
        'default:',
        '  2;',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'switch (1) {',
        'default: {',
        '  2;',
        '}',
        '}'
      ])
      expect(linting(text)).toNotReportViolationForAnyRule()
    })
  })
})
