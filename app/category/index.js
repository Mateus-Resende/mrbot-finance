const Category = require('./model')
const Repository = require('./repository')

class UseCase {
  constructor (message) {
    this.userId = message.from.id
    this.message = message
  }

  create () {
    const values = this.message.split(' ')

    const model = new Category({
      name: values[0],
      spendingLimit: values[1],
      userId: this.userId
    })

    Repository.create(model)
      .then(res => {
        return `Category ${model.name} created with max value of ${model.maxValue}`
      })
      .catch(res => {
        const msg = [
          'Could not create the category with ',
          `name: ${model.name} and maxValue: ${model.spendingLimit}\n`,
          'Please use the following format:',
          '/addcategory <name> <maximum_value>'
        ]
        return msg.join()
      })
  }

  update () {

  }

  delete () {

  }
}

module.exports = UseCase
