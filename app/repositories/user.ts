import { EntityManager, Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import User from '../entities/user.entity';

export default class UserRepository extends Repository<User> {
  public constructor(managerDataSource: EntityManager = AppDataSource.manager) {
    super(User, managerDataSource);
  }

  public async findByUsername(username: string): Promise<User> {
    return this.createQueryBuilder('users')
      .where('users.username = :username', { username })
      .getOne();
  }
}
