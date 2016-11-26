/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

function containsRuleViolationWithSeverity (results, ruleId, severity) {
  return results.results.some((result) => {
    return result.messages.some((message) => message.ruleId === ruleId && message.severity === severity)
  })
}

function doesNotContainRuleViolation (results, ruleId) {
  return results.results.every((result) => {
    return result.messages.every((message) => message.ruleId !== ruleId)
  })
}

function formatFailureMessage (results, ruleId, condition) {
  return `Expected ${condition} for rule '${ruleId}' but results were ${JSON.stringify(results)}.`
}

beforeEach(() => {
  jasmine.addMatchers({
    toNotReportViolationForRule () {
      return {
        compare (results, ruleId) {
          return {
            message: formatFailureMessage(results, ruleId, 'no violation'),
            pass: doesNotContainRuleViolation(results, ruleId)
          }
        }
      }
    },

    toReportErrorForRule () {
      return {
        compare (results, ruleId) {
          return {
            message: formatFailureMessage(results, ruleId, 'an error'),
            pass: containsRuleViolationWithSeverity(results, ruleId, 2)
          }
        }
      }
    },

    toReportWarningForRule () {
      return {
        compare (results, ruleId) {
          return {
            message: formatFailureMessage(results, ruleId, 'a warning'),
            pass: containsRuleViolationWithSeverity(results, ruleId, 1)
          }
        }
      }
    }
  })
})
