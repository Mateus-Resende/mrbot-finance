const Category = require('./model')
const CategoryRepository = require('./repository')
const Repository = new CategoryRepository()

class UseCase {
  constructor (update) {
    this.userId = update.from.id
    this.text = update.message.text
  }

  async create () {
    const values = this.text.split('-')

    const model = new Category({
      name: values[1].trim(),
      spendingLimit: parseFloat(values[2]),
      userId: this.userId
    })

    try {
      await Repository.create(model)
      return `Category ${model.name} created with max value of ${model.spendingLimit}`
    } catch (err) {
      return err.message
    }
  }
}

module.exports = UseCase
