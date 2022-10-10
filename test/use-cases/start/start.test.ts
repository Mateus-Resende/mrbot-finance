import UserRepository from '../../../app/repositories/user';
import { Start } from '../../../app/use-cases/start';

jest.mock('../../../app/repositories/user.ts');

describe('/Start', () => {
  const userRepository = new UserRepository();
  let sut = new Start(userRepository);

  describe('when the user does not exist yet', () => {
    let repositoryMock;

    beforeEach(() => {
      repositoryMock = jest
        .spyOn(UserRepository.prototype, 'findByUsername')
        .mockImplementationOnce(() => {
          return null;
        });
    });

    afterEach(() => {
      repositoryMock.mockClear();
    })

    test('it returns a successful message', async () => {
      const messengerUser = {
        id: 123,
        first_name: 'Test',
        username: 'test-jest',
        is_bot: false,
      };

      const response = await sut.run(messengerUser);
      expect(response).toMatch(/Sua conta foi criada com sucesso/);
    });

    test('calls the repository to insert the user', async () => {
      const messengerUser = {
        id: 123,
        first_name: 'Test',
        username: 'test-jest',
        is_bot: false,
      };

      await sut.run(messengerUser);
      expect(repositoryMock).toHaveBeenCalledTimes(1);
    })
  });
});
