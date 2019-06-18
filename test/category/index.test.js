const path = require('path')

const { setupTables, tearDown, findCategory } = require('../test-helper')
const UseCase = require(path.resolve(process.cwd(), './app/category/index'))

/* eslint-disable no-undef */

beforeEach(() => {
  return setupTables()
})

afterEach(() => {
  return tearDown()
})

describe('when sending the create message', () => {
  describe('with the correct params', () => {
    const name = 'supermarket'
    const spendingLimit = 100
    const userId = '123'

    const message = {
      from: {
        id: userId
      },
      message: {
        text: `/addcategory - ${name} - ${spendingLimit}`
      }
    }

    test('it creates a category', (done) => {
      new UseCase(message)
        .create()
        .then((res) => {
          expect(res).toEqual(`Category ${name} created with max value of ${spendingLimit}`)
          done()
        })
        .catch((err) => {
          fail(err)
          done()
        })
    })

    test('saves in the database', async () => {
      try {
        await new UseCase(message).create()
        const { rows } = await findCategory(name)
        expect(rows).toHaveLength(1)
        expect(rows[0].spending_limit).toEqual(spendingLimit)
        expect(rows[0].user_id).toEqual(userId)
      } catch (err) {
        fail(err)
      }
    })

    test('raises an error when trying to create with same name', async () => {
      try {
        await new UseCase(message).create()
        const res = await new UseCase(message).create()
        expect(res).toMatch(/duplicate key(.+)categories_name_key(.+)/)
      } catch (err) {
        fail(err)
      }
    })
  })
})
