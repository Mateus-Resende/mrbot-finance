const { query } = require('../../config/db')
const Category = require('./model.js')

class CategoryRepository {
  async create (model) {
    const queryStr = `
      INSERT INTO categories (id, user_id, name, spending_limit, current)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const values = [
      model.id,
      model.userId,
      model.name,
      model.spendingLimit,
      model.current
    ]
    return this.run(queryStr, values)
  }

  async find (userId, name) {
    const queryStr = `
      SELECT *
        FROM categories
        WHERE
          user_id = $1 AND
          name = $2
        LIMIT 1
    `

    return this.run(queryStr, [userId, name])
  }

  async run (queryStr, params) {
    try {
      const { rows } = await query(queryStr, params)
      if (rows[0]) {
        return this.toModel(rows[0])
      } else {
        throw new Error('Category not found')
      }
    } catch (err) {
      throw err
    }
  }

  toModel (rawAttrs) {
    return new Category({
      id: rawAttrs.id,
      userId: rawAttrs.user_id,
      name: rawAttrs.name,
      spendingLimit: rawAttrs.spending_limit,
      current: rawAttrs.current,
      createdAt: rawAttrs.created_at,
      updatedAt: rawAttrs.updated_at,
      deletedAt: rawAttrs.deleted_at
    })
  }
}

module.exports = CategoryRepository
