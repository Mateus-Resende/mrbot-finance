const Category = require('./model')
const CategoryRepository = require('./repository')
const Repository = new CategoryRepository()

const debug = require('debug')()

const DEFAULT_ERROR_MESSAGE = 'I could not understand what happened, please try again'
const ERROR_MAPPING = {
  '23502': 'Name and value need to be present, please check your spelling',
  '23505': 'A category with the name $name already exists, please try with another one',
  '22P02': 'The max value of the category needs to be a number, given: $value'
}
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
      return this.errorMapping(err, model)
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

  errorMapping (err, model) {
    const message = ERROR_MAPPING[err.code]
      .replace('$name', model.name)
      .replace('$value', model.spendingLimit)
    return message || DEFAULT_ERROR_MESSAGE
  }
}

module.exports = UseCase
