/*
 * Copyright (c) 2016 Steven Soloff
 *
 * This is free software: you can redistribute it and/or modify it under the
 * terms of the MIT License (https://opensource.org/licenses/MIT).
 * This software comes with ABSOLUTELY NO WARRANTY.
 */

'use strict'

const fs = require('fs')
const glob = require('glob')
const jsonlint = require('jsonlint')

function findJsonFiles () {
  return glob.sync('**/*.json', {
    dot: true,
    ignore: 'node_modules/**'
  })
}

function formatErrorMessage (filename, hash) {
  return `${filename}: line ${hash.loc.first_line}, col ${hash.loc.last_column}, ` +
    `found: '${hash.token}' - expected: ${hash.expected.join(', ')}.`
}

function readJsonFile (filename) {
  // Assume UTF-8 encoding for now
  return fs.readFileSync(filename, {encoding: 'utf8'})
}

function validateJson (filename) {
  jsonlint.parser.parseError = jsonlint.parser.lexer.parseError = (str, hash) => {
    console.error(formatErrorMessage(filename, hash))
    throw new Error(str)
  }
  jsonlint.parse(readJsonFile(filename))
}

findJsonFiles().map((filename) => {
  try {
    validateJson(filename)
  } catch (err) {
    process.exit(1) // eslint-disable-line no-process-exit
  }
})
