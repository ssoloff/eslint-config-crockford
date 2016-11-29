/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const createEngine = require('../support/test-util').createEngine

function containsNoViolations (results) {
  return results.results.every((result) => result.messages.length === 0)
}

function containsViolationsOnlyForRule (results, ruleId) {
  return (results.results.length > 0) && results.results.every((result) => {
    return (result.messages.length > 0) && result.messages.every((message) => message.ruleId === ruleId)
  })
}

function formatFailureMessage (condition, results, ruleId) {
  const ruleClause = ruleId ? `rule '${ruleId}'` : 'any rule'
  return `Expected ${condition} for ${ruleClause} but results were ${JSON.stringify(results)}.`
}

function lint (text) {
  const engine = createEngine()
  return engine.executeOnText(text)
}

beforeEach(() => {
  jasmine.addMatchers({
    toNotRaiseViolation () {
      return {
        compare (text) {
          const results = lint(text)
          return {
            message: formatFailureMessage('no violation', results),
            pass: containsNoViolations(results)
          }
        }
      }
    },

    toRaiseViolationForRule () {
      return {
        compare (text, ruleId) {
          const results = lint(text)
          return {
            message: formatFailureMessage('a violation', results, ruleId),
            pass: containsViolationsOnlyForRule(results, ruleId)
          }
        }
      }
    }
  })
})
