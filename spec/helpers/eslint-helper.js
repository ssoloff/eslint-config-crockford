/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

function checkForFatalErrors (results) {
  const fatal = results.results.some((result) => {
    return result.messages.some((message) => message.fatal === true)
  })
  if (fatal) {
    throw new Error(`Encountered fatal error in results ${formatResults(results)}.`)
  }
}

function containsRuleViolationWithSeverity (results, ruleId, severity) {
  return results.results.some((result) => {
    return result.messages.some((message) => message.ruleId === ruleId && message.severity === severity)
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

beforeEach(() => {
  jasmine.addMatchers({
    toNotReportViolationForAnyRule () {
      return {
        compare (results) {
          checkForFatalErrors(results)
          return {
            message: formatFailureMessage('no violation', results),
            pass: doesNotContainAnyRuleViolation(results)
          }
        }
      }
    },

    toReportErrorForRule () {
      return {
        compare (results, ruleId) {
          checkForFatalErrors(results)
          return {
            message: formatFailureMessage('an error', results, ruleId),
            pass: containsRuleViolationWithSeverity(results, ruleId, 2)
          }
        }
      }
    },

    toReportWarningForRule () {
      return {
        compare (results, ruleId) {
          checkForFatalErrors(results)
          return {
            message: formatFailureMessage('a warning', results, ruleId),
            pass: containsRuleViolationWithSeverity(results, ruleId, 1)
          }
        }
      }
    }
  })
})
