import { User as MessengerUser } from 'telegraf/typings/telegram-types';
import User from '../../entities/user.entity';
import UserRepository from '../../repositories/user';

function buildUser(params: MessengerUser): User {
  const user = new User();
  user.messengerId = params.id;
  user.firstName = params.first_name;
  user.lastName = params.last_name;
  user.username = params.username;
  return user;
}

export default class Start {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async run(messengerUser: MessengerUser): Promise<string> {
    let response = '';
    const user = buildUser(messengerUser);

    if (await this.userRepository.findByUsername(user.username)) {
      response = 'Bem vindo de volta! Seus dados foram guardados cuidadosamente';
    } else {
      try {
        await this.userRepository.insert(user);
        response = 'Sua conta foi criada com sucesso! Você já está um passo a frente para cuidar das suas finanças!';
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        response = 'Não foi possível criar um usuário para você, uma pessoa da nossa equipe entrará em contato com você para entender o que houve';
      }
    }

    return response;
  }
}
