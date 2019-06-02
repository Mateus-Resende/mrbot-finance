require('dotenv').config()
const { Pool } = require('pg')
const path = require('path')
const fs = require('fs')

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env
const pgUri = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`

const pool = new Pool({
  connectionString: pgUri
})

/**
 * Create Tables
 */
const setupTables = () => {
  const queryText = fs.readFileSync(path.resolve(process.cwd(), 'config/schema.sql')).toString()

  return pool.query(queryText)
    .catch((err) => {
      throw err
    })
}

/**
 * Truncate Tables
 */
const tearDown = () => {
  const queryText = `DROP TABLE IF EXISTS categories`

  return pool.query(queryText)
    .catch((err) => {
      throw err
    })
}

module.exports = { setupTables, tearDown }
