/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const source = require('./support/test-util').source

describe('Compound statement', () => {
  it('should raise a violation when Stroustrup brace style is used', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '}',
      'else {',
      '    3;',
      '}'
    ])
    expect(text).toRaiseViolationForRule('brace-style')
  })

  it('should raise a violation when Allman brace style is used', () => {
    const text = source([
      'if (1)',
      '{',
      '    2;',
      '}',
      'else',
      '{',
      '    3;',
      '}'
    ])
    expect(text).toRaiseViolationForRule('brace-style')
  })

  it('should not raise a violation when one true brace style is used', () => {
    const text = source([
      'if (1) {',
      '    2;',
      '} else {',
      '    3;',
      '}'
    ])
    expect(text).toNotRaiseViolation()
  })

  it('should raise a violation when one true brace style is used on a single line', () => {
    const text = source([
      'if (1) { 2; } else { 3; }'
    ])
    expect(text).toRaiseViolationForRule('brace-style')
  })
})
