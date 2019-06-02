const Category = require('./model')
const Repository = require('./repository')

class UseCase {
  constructor (update) {
    this.userId = update.from.id
    this.text = update.message.text
  }

  create () {
    const values = this.text.split('-')

    const model = new Category({
      name: values[1].trim(),
      spendingLimit: parseFloat(values[2]),
      userId: this.userId
    })

    return Repository.create(model)
      .then(res => {
        return `Category ${model.name} created with max value of ${model.spendingLimit}`
      })
      .catch(res => {
        return res.message
      })
  }
}

module.exports = UseCase
