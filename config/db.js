const { Pool } = require('pg')

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env

const pgUri = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`

const pool = new Pool({
  connectionString: pgUri
})

pool.on('connect', () => {
  console.log('connected to the db')
})

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      categories(
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        name VARCHAR(128) NOT NULL,
        spending_limit INTEGER NOT NULL,
        current INTEGER DEFAULT 0,
        deleted_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      )`

  pool.query(queryText)
    .then((res) => {
      console.error(res)
      pool.end()
    })
    .catch((err) => {
      console.error(err)
      pool.end()
    })
}

module.exports = { createTables }
