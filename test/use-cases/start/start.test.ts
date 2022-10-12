import User from '../../../app/entities/user.entity';
import UserRepository from '../../../app/repositories/user';
import Start from '../../../app/use-cases/start';

jest.mock('../../../app/repositories/user.ts');

describe('/Start', () => {
  const userRepository = new UserRepository();
  const sut = new Start(userRepository);

  const messengerUser = {
    id: 123,
    first_name: 'Test',
    username: 'test-jest',
    is_bot: false,
  };

  describe('when the user does not exist yet', () => {
    let repositoryMock;

    beforeEach(() => {
      repositoryMock = jest
        .spyOn(UserRepository.prototype, 'findByUsername')
        .mockImplementationOnce(() => null);
    });

    afterEach(() => {
      repositoryMock.mockClear();
    });

    test('it returns a successful message', async () => {
      const response = await sut.run(messengerUser);
      expect(response).toMatch(/Sua conta foi criada com sucesso/);
    });

    test('calls the repository to insert the user', async () => {
      await sut.run(messengerUser);
      expect(repositoryMock).toHaveBeenCalledTimes(1);
    });

    test('it returns an error message if the user cannot be created', async () => {
      jest
        .spyOn(UserRepository.prototype, 'insert')
        .mockImplementationOnce(() => {
          throw new Error();
        });
      const response = await sut.run(messengerUser);
      expect(response).toMatch(/Não foi possível criar um usuário para você/);
    });
  });

  describe('when the user already exists', () => {
    let repositoryMock;

    beforeEach(() => {
      repositoryMock = jest
        .spyOn(UserRepository.prototype, 'findByUsername')
        .mockImplementationOnce(() => {
          const user = new User();
          user.id = messengerUser.id;
          user.firstName = messengerUser.first_name;
          user.username = messengerUser.username;
          return Promise.resolve(user);
        });
    });

    afterEach(() => {
      repositoryMock.mockClear();
    });

    test('returns a successful message that the user is still present', async () => {
      const response = await sut.run(messengerUser);
      expect(response).toMatch(/Bem vindo de volta/);
    });
  });
});
