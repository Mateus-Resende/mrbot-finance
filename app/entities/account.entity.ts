import {
  Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne,
} from 'typeorm';
import type User from './user.entity';

@Entity({ name: 'accounts' })
export default class Account {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Generated('uuid')
    uuid: string;

  @Column()
    name: string;

  @ManyToOne('User', 'accounts')
    user: User;

  @Column({ name: 'created_at' })
    createdAt: Date;

  @Column({ name: 'updated_at' })
    updatedAt: Date;

  @Column({ name: 'deleted_at' })
    deletedAt: Date;
}
