const path = require('path')

const { setupTables, tearDown } = require('../test-helper')
const Category = require(path.resolve(process.cwd(), './app/category/model'))
const Repository = require(path.resolve(process.cwd(), './app/category/repository'))

/* eslint-disable no-undef */

beforeEach((done) => {
  setupTables()
    .then(() => done())
})

afterEach((done) => {
  tearDown()
    .then(() => done())
})

let params = {
  userId: '1',
  name: 'asdf',
  spendingLimit: 100,
  current: 10
}

describe('with valid params', () => {
  let model = new Category(params)

  test('saves in the database', (done) => {
    Repository
      .create(model)
      .then(res => {
        expect(res.current).toEqual(params.current)
        expect(res.spendingLimit).toEqual(params.spendingLimit)
        expect(res.name).toEqual(params.name)
        expect(res.userId).toEqual(params.userId)
        expect(res.createdAt).not.toBeNull()
        expect(res.updatedAt).not.toBeNull()
        expect(res.deletedAt).toBeNull()
        done()
      })
      .catch(err => {
        fail(err)
        done()
      })
  })
})

describe('with invalid params', () => {
  describe('when the user_id is missing', () => {
    let model = new Category(params)
    model['userId'] = undefined

    test('raises an error', (done) => {
      Repository.create(model)
        .then((res) => {
          fail()
        })
        .catch((err) => {
          expect(err.message).toEqual('null value in column "user_id" violates not-null constraint')
          expect(err.column).toEqual('user_id')
          done()
        })
    })
  })

  describe('when the name is missing', () => {
    let model = new Category(params)
    model.name = undefined

    test('raises an error', (done) => {
      Repository.create(model)
        .then((res) => {
          fail()
        })
        .catch((err) => {
          expect(err.message).toEqual('null value in column "name" violates not-null constraint')
          expect(err.column).toEqual('name')
          done()
        })
    })
  })

  describe('when the id is not a uuid', () => {
    let model = new Category(params)
    model.id = 123

    test('raises an error', (done) => {
      Repository.create(model)
        .then((res) => {
          fail(res)
          done()
        })
        .catch((err) => {
          expect(err.message).toEqual(`invalid input syntax for type uuid: "${model.id}"`)
          done()
        })
    })
  })

  describe('when the spending_limit is missing', () => {
    let model = new Category(params)
    model.spendingLimit = undefined

    test('raises an error', (done) => {
      Repository.create(model)
        .then((res) => {
          fail()
        })
        .catch((err) => {
          expect(err.message).toEqual('null value in column "spending_limit" violates not-null constraint')
          expect(err.column).toEqual('spending_limit')
          done()
        })
    })
  })
})

/* eslint-ensable no-undef */
