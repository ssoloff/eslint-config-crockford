/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const _ = require('lodash')

function containsNoViolations (results) {
  return results.results.every((result) => result.messages.length === 0)
}

function containsViolationsOnlyForRules (results, ruleIds) {
  const expectedRuleIds = new Set(ruleIds)

  const actualRuleIds = new Set()
  results.results.forEach((result) => {
    result.messages.forEach((message) => {
      actualRuleIds.add(message.ruleId)
    })
  })

  return _.isEqual(expectedRuleIds, actualRuleIds)
}

function formatFailureMessage (condition, results, ruleIds) {
  const ruleClause = ruleIds ? `rule${ruleIds.length === 1 ? '' : 's'} '${ruleIds.join('\', \'')}'` : 'any rule'
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
            message: formatFailureMessage('a violation', results, [ruleId]),
            pass: containsViolationsOnlyForRules(results, [ruleId])
          }
        }
      }
    },

    toReportViolationForRules () {
      return {
        compare (results, ruleIds) {
          return {
            message: formatFailureMessage('a violation', results, ruleIds),
            pass: containsViolationsOnlyForRules(results, ruleIds)
          }
        }
      }
    }
  })
})
