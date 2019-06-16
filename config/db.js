require('dotenv').config()

const { Pool } = require('pg')
const path = require('path')
const fs = require('fs')

const { POSTGRES_USER, POSTGRES_PASSWORD, PGHOST, PGPORT, POSTGRES_DB } = process.env
const pgUri = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${PGHOST}:${PGPORT}/${POSTGRES_DB}`

/**
 * Create Tables
 */
const createTables = () => {
  const pool = new Pool({
    connectionString: pgUri
  })
  const queryText = fs.readFileSync(path.resolve(process.cwd(), 'config/schema.sql')).toString()

  return pool.query(queryText)
    .then((res) => {
      pool.end()
    })
    .catch((err) => {
      pool.end()
      console.error(err)
      throw err
    })
}

const query = function (text, params) {
  const pool = new Pool({
    connectionString: pgUri
  })

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
