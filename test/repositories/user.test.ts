import { TestDataSource } from '../../app/data-source';
import UserRepository from '../../app/repositories/user';

describe('UserRepository', () => {
  let sut: UserRepository;

  beforeAll(async () => {
    await TestDataSource.initialize();
    sut = new UserRepository(TestDataSource.manager);
  });

  afterAll(async () => {
    await TestDataSource.dropDatabase();
    await TestDataSource.destroy();
  });

  beforeEach(async () => {
    sut.insert({
      id: 123,
      messengerId: 123,
      firstName: 'Test',
      lastName: 'Jest',
      username: 'test-jest'
    });
  });

  test('fetches a user by username', async () => {
    const user = await sut.findByUsername('test-jest');
    expect(user.firstName).toEqual('Test');
  });
});
