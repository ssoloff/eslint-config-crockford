/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const config = require('../')

describe('The configuration', () => {
  it('should contain the required properties', () => {
    expect(config).toBeNonEmptyObject()
    expect(config.rules).toBeNonEmptyObject()
  })
})
