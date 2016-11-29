/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const source = require('./support/test-util').source

describe('Indentation', () => {
  it('should raise a violation when both spaces and tabs are used', () => {
    const text = source(['\t    var foo = 1;'])
    expect(text).toRaiseViolationForRule('no-mixed-spaces-and-tabs')
  })

  it('should not raise a violation when only spaces are used', () => {
    const text = source(['        var foo = 1;'])
    expect(text).toNotRaiseViolation()
  })

  it('should raise a violation when 2 spaces are used', () => {
    const text = source([
      'if (1) {',
      '  2;',
      '}'
    ])
    expect(text).toRaiseViolationForRule('indent')
  })

  it('should raise a violation when tabs are used', () => {
    const text = source([
      'if (1) {',
      '\t2;',
      '}'
    ])
    expect(text).toRaiseViolationForRule('indent')
  })

  it('should not raise a violation when 4 spaces are used', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '}'
    ])
    expect(text).toNotRaiseViolation()
  })

  it('should raise a violation when a case label is not aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      '    case 2:',
      '        3;',
      '}'
    ])
    expect(text).toRaiseViolationForRule('indent')
  })

  it('should not raise a violation when a case label is aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      'case 2:',
      '    3;',
      '}'
    ])
    expect(text).toNotRaiseViolation()
  })

  it('should raise a violation when a default label is not aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      '    default:',
      '        2;',
      '}'
    ])
    expect(text).toRaiseViolationForRule('indent')
  })

  it('should not raise a violation when a default label is aligned with the switch', () => {
    const text = source([
      'switch (1) {',
      'default:',
      '    2;',
      '}'
    ])
    expect(text).toNotRaiseViolation()
  })
})
