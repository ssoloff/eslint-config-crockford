/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const createEngine = require('../support/test-util').createEngine

function containsRuleViolationWithSeverity (results, ruleId, severity) {
  return (results.results.length > 0) && results.results.every((result) => {
    return (result.messages.length > 0) && result.messages.every((message) => {
      return (message.ruleId === ruleId) && (message.severity === severity)
    })
  })
}

function doesNotContainAnyRuleViolation (results) {
  return results.results.every((result) => result.messages.length === 0)
}

function formatFailureMessage (condition, results, ruleId) {
  const ruleClause = ruleId ? `rule '${ruleId}'` : 'any rule'
  return `Expected ${condition} for ${ruleClause} but results were ${formatResults(results)}.`
}

function formatResults (results) {
  return JSON.stringify(results)
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
            pass: doesNotContainAnyRuleViolation(results)
          }
        }
      }
    },

    toRaiseErrorForRule () {
      return {
        compare (text, ruleId) {
          const results = lint(text)
          return {
            message: formatFailureMessage('an error', results, ruleId),
            pass: containsRuleViolationWithSeverity(results, ruleId, 2)
          }
        }
      }
    },

    toRaiseWarningForRule () {
      return {
        compare (text, ruleId) {
          const results = lint(text)
          return {
            message: formatFailureMessage('a warning', results, ruleId),
            pass: containsRuleViolationWithSeverity(results, ruleId, 1)
          }
        }
      }
    }
  })
})
