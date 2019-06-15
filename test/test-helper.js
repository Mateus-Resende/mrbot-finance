require('dotenv').config()
const { Pool } = require('pg')
const path = require('path')
const fs = require('fs')

const { POSTGRES_USER, POSTGRES_PASSWORD, PGHOST, PGPORT, POSTGRES_DB } = process.env
const pgUri = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${PGHOST}:${PGPORT}/${POSTGRES_DB}`

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

const findCategory = (name) => {
  const queryText = `SELECT * from categories where name = $1`
  return pool.query(queryText, [name])
}

module.exports = { setupTables, tearDown, findCategory }
