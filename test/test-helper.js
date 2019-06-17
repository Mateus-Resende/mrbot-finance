require('dotenv').config()
const { createTables, query } = require('../config/db')

/**
 * Create Tables
 */
const setupTables = () => {
  return createTables()
}

/**
 * Truncate Tables
 */
const tearDown = () => {
  const queryText = `TRUNCATE TABLE categories RESTART IDENTITY`

  return query(queryText)
}

const findCategory = (name) => {
  const queryText = `SELECT * from categories where name = $1`
  return query(queryText, [name])
}

module.exports = { setupTables, tearDown, findCategory }
