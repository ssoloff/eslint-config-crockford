/*
 * Copyright (c) 2016-2017 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

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

beforeEach(() => {
  jasmine.addMatchers({
    toNotReportViolation () {
      return {
        compare (results) {
          return {
            message: formatFailureMessage('no violation', results),
            pass: containsNoViolations(results)
          }
        }
      }
    },

    toReportViolationForRule () {
      return {
        compare (results, ruleId) {
          return {
            message: formatFailureMessage('a violation', results, ruleId),
            pass: containsViolationsOnlyForRule(results, ruleId)
          }
        }
      }
    }
  })
})
