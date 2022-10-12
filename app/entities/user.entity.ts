import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import type Account from './account.entity';
import type Category from './category.entity';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'messenger_id' })
    messengerId: number;

  @Column({ name: 'first_name' })
    firstName: string;

  @Column({ name: 'last_name' })
    lastName: string;

  @Column({ unique: true })
    username: string;

  @OneToMany('Category', 'user')
    categories: Category[];

  @OneToMany('Account', 'user')
    accounts: Account[];
}
