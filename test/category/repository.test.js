const path = require('path')

const { setupTables, tearDown } = require('../test-helper')
const Category = require(path.resolve(process.cwd(), './app/category/model'))
const CategoryRepository = require(path.resolve(process.cwd(), './app/category/repository'))
const Repository = new CategoryRepository()

/* eslint-disable no-undef */

beforeEach(() => {
  return setupTables()
})

afterEach(() => {
  return tearDown()
})

let params = {
  userId: '1',
  name: 'asdf',
  spendingLimit: 100,
  current: 10
}

describe('#create', () => {
  describe('with valid params', () => {
    let model = new Category(params)

    test('saves in the database', async () => {
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
        try {
          await Repository.create(model)
          fail()
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
        try {
          await Repository.create(model)
          await Repository.create(model)
          fail()
        } catch (err) {
          expect(err.code).toMatch(/23505/)
        }
      })
    })

    describe('when the name is missing', () => {
      let model = new Category(params)
      model.name = undefined

      test('raises an error', async () => {
        try {
          await Repository.create(model)
          fail()
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
        try {
          await Repository.create(model)
          fail()
        } catch (err) {
          expect(err.code).toMatch(/22P02/)
          expect(err.message).toMatch(/invalid input syntax(.+)uuid/)
        }
      })
    })

    describe('when the spendingLimit is not a number', () => {
      let model = new Category(params)
      model.spendingLimit = 'asbsc'

      test('raises an error', async () => {
        try {
          await Repository.create(model)
          fail()
        } catch (err) {
          expect(err.code).toMatch(/22P02/)
          expect(err.message).toMatch(/invalid input syntax(.+)/)
        }
      })
    })

    describe('when the spending_limit is missing', () => {
      let model = new Category(params)
      model.spendingLimit = undefined

      test('raises an error', async () => {
        try {
          await Repository.create(model)
          fail()
        } catch (err) {
          expect(err.code).toMatch(/23502/)
          expect(err.message).toEqual('null value in column "spending_limit" violates not-null constraint')
          expect(err.column).toEqual('spending_limit')
        }
      })
    })
  })
})

describe('#find', () => {
  const model = new Category({
    userId: '1',
    name: 'asdf',
    spendingLimit: 100,
    current: 10
  })

  describe('when the category exists', () => {
    test('it returns the correct result', async () => {
      try {
        await Repository.create(model)
        const res = await Repository.find({ userId: params.userId, name: params.name })

        expect(res.id).toEqual(model.id)
        expect(res.userId).toEqual(model.userId)
        expect(res.name).toEqual(model.name)
        expect(res.spendingLimit).toEqual(model.spendingLimit)
        expect(res.current).toEqual(model.current)

        expect(res.createdAt).not.toBeNull()
        expect(res.updatedAt).not.toBeNull()
        expect(res.deletedAt).toBeNull()
      } catch (err) {
        fail(err)
      }
    })
  })

  describe('when the category does not exists', () => {
    test('it returns an error', async () => {
      try {
        await Repository.find(params.userId, params.name)
      } catch (err) {
        expect(err.message).toEqual('Category not found')
      }
    })
  })
})
/* eslint-ensable no-undef */
