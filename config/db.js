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
const createTables = () => {
  const queryText = fs.readFileSync(path.resolve(process.cwd(), 'config/schema.sql')).toString()

  pool.query(queryText)
    .then((res) => {
      pool.end()
    })
    .catch((err) => {
      throw err
    })
    .finally(() => pool.end())
}

const query = function (text, params) {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = { createTables, query }
