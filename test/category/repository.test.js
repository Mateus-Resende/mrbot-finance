const path = require('path')

const { setupTables, tearDown } = require('../test-helper')
const Category = require(path.resolve(process.cwd(), './app/category/model'))
const CategoryRepository = require(path.resolve(process.cwd(), './app/category/repository'))
const Repository = new CategoryRepository()

/* eslint-disable no-undef */

beforeEach(async () => {
  await setupTables()
})

afterEach(async () => {
  await tearDown()
})

let params = {
  userId: '1',
  name: 'asdf',
  spendingLimit: 100,
  current: 10
}

describe('with valid params', () => {
  let model = new Category(params)

  test('saves in the database', async () => {
    expect.assertions(7)
    const res = await Repository.create(model)
    expect(res.current).toEqual(params.current)
    expect(res.spendingLimit).toEqual(params.spendingLimit)
    expect(res.name).toEqual(params.name)
    expect(res.userId).toEqual(params.userId)
    expect(res.createdAt).not.toBeNull()
    expect(res.updatedAt).not.toBeNull()
    expect(res.deletedAt).toBeNull()
  })
})

describe('with invalid params', () => {
  describe('when the user_id is missing', () => {
    let model = new Category(params)
    model['userId'] = undefined

    test('raises an error', async () => {
      expect.assertions(3)

      try {
        await Repository.create(model)
      } catch (err) {
        expect(err.code).toMatch(/23502/)
        expect(err.message).toEqual('null value in column "user_id" violates not-null constraint')
        expect(err.column).toEqual('user_id')
      }
    })
  })

  describe('when creating with the same name', () => {
    let model = new Category(params)

    test('raises an error', async () => {
      expect.assertions(1)

      try {
        await Repository.create(model)
        await Repository.create(model)
      } catch (err) {
        expect(err.code).toMatch(/23505/)
      }
    })
  })

  describe('when the name is missing', () => {
    let model = new Category(params)
    model.name = undefined

    test('raises an error', async () => {
      expect.assertions(3)

      try {
        await Repository.create(model)
      } catch (err) {
        expect(err.code).toMatch(/23502/)
        expect(err.message).toEqual('null value in column "name" violates not-null constraint')
        expect(err.column).toEqual('name')
      }
    })
  })

  describe('when the id is not a uuid', () => {
    let model = new Category(params)
    model.id = 123

    test('raises an error', async () => {
      expect.assertions(2)

      try {
        await Repository.create(model)
      } catch (err) {
        expect(err.code).toMatch(/22P02/)
        expect(err.message).toMatch(/invalid input syntax(.+)uuid/)
      }
    })
  })

  describe('when the spending_limit is missing', () => {
    let model = new Category(params)
    model.spendingLimit = undefined

    test('raises an error', async () => {
      expect.assertions(3)

      try {
        await Repository.create(model)
      } catch (err) {
        expect(err.code).toMatch(/23502/)
        expect(err.message).toEqual('null value in column "spending_limit" violates not-null constraint')
        expect(err.column).toEqual('spending_limit')
      }
    })
  })
})

/* eslint-ensable no-undef */
