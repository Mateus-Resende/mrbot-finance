const { query } = require('../../config/db')
const Category = require('./model.js')

class CategoryRepository {
  static async create (model) {
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
    try {
      const { rows } = await query(queryStr, values)
      return this.toModel(rows[0])
    } catch (err) {
      throw err
    }
  }

  static toModel (rawAttrs) {
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
