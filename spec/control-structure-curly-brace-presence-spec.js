/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const source = require('./support/test-util').source

describe('Control structure curly brace presence', () => {
  describe('for an if statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'if (1)',
        '    2;'
      ])
      expect(text).toRaiseViolationForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'if (1) {',
        '    2;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for an else statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'if (1) {',
        '    2;',
        '} else',
        '    3;'
      ])
      expect(text).toRaiseViolationForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'if (1) {',
        '    2;',
        '} else {',
        '    3;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for a for statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'for (;;)',
        '    1;'
      ])
      expect(text).toRaiseViolationForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'for (;;) {',
        '    1;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for a for...in statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'var p;',
        'for (p in {})',
        '    1;'
      ])
      expect(text).toRaiseViolationForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'var p;',
        'for (p in {}) {',
        '    1;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for a for...of statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'var p;',
        'for (p of [])',
        '    1;'
      ])
      expect(text).toRaiseViolationForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'var p;',
        'for (p of []) {',
        '    1;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for a while statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'while (1)',
        '    2;'
      ])
      expect(text).toRaiseViolationForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'while (1) {',
        '    2;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for a do...while statement', () => {
    it('should raise a violation when curly braces are absent', () => {
      const text = source([
        'do',
        '    2;',
        'while (1);'
      ])
      expect(text).toRaiseViolationForRule('curly')
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'do {',
        '    2;',
        '} while (1);'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for a case label', () => {
    it('should not raise a violation when curly braces are absent', () => {
      const text = source([
        'switch (1) {',
        'case 1:',
        '    2;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'switch (1) {',
        'case 1: {',
        '    2;',
        '}',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })

  describe('for a default label', () => {
    it('should not raise a violation when curly braces are absent', () => {
      const text = source([
        'switch (1) {',
        'default:',
        '    2;',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })

    it('should not raise a violation when curly braces are present', () => {
      const text = source([
        'switch (1) {',
        'default: {',
        '    2;',
        '}',
        '}'
      ])
      expect(text).toNotRaiseViolation()
    })
  })
})
