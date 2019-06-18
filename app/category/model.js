const uuidv4 = require('uuid/v4')

class Category {
  constructor (obj) {
    this.id = obj.id || uuidv4()
    this.userId = obj.userId
    this.name = obj.name
    this.spendingLimit = obj.spendingLimit
    this.current = obj.current || 0.0
    this.deletedAt = obj.deletedAt
    this.updatedAt = obj.updatedAt
    this.createdAt = obj.createdAt
  }

  get id () {
    return this._id
  }

  get userId () {
    return this._userId
  }

  get name () {
    return this._name
  }

  get spendingLimit () {
    return this._spendingLimit
  }

  get current () {
    return this._current
  }

  get deletedAt () {
    return this._deletedAt
  }

  get updatedAt () {
    return this._updatedAt
  }

  get createdAt () {
    return this._createdAt
  }

  set id (id) {
    this._id = id
  }

  set userId (userId) {
    this._userId = userId
  }

  set name (name) {
    this._name = name
  }

  set spendingLimit (spendingLimit) {
    this._spendingLimit = spendingLimit
  }

  set current (current) {
    this._current = current
  }

  set deletedAt (deletedAt) {
    this._deletedAt = deletedAt
  }

  set updatedAt (updatedAt) {
    this._updatedAt = updatedAt
  }

  set createdAt (createdAt) {
    this._createdAt = createdAt
  }
}

module.exports = Category
