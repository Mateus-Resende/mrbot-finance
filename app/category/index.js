const Category = require('./model')
const CategoryRepository = require('./repository')
const Repository = new CategoryRepository()

const debug = require('debug')()

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
      const res = await Repository.create(model)
      debug(res)
      return `Category ${model.name} created with max value of ${model.spendingLimit}`
    } catch (err) {
      return err.message
    }
  }

  async find () {
    const values = this.text.split(' ')
    values.shift()
    const name = values.join(' ')
    try {
      const model = await Repository.find({ userId: this.userId, name })
      return `Category ${model.name} currently sum a total of $${model.current} and the maximum is $${model.spendingLimit}`
    } catch (err) {
      return `Could not find any category with name ${name}`
    }
  }
}

module.exports = UseCase
