import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Generated,
} from 'typeorm';
import type Transaction from './transaction.entity';
import type User from './user.entity';

@Entity({ name: 'categories' })
export default class Category {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Generated('uuid')
    uuid: string;

  @Column()
    name: string;

  @Column()
    code: string;

  @Column({ name: 'spending_limit' })
    spendingLimit: Number;

  @Column({ name: 'current_spent' })
    current_spent: Number;

  @ManyToOne('User', 'categories')
    user: User;

  @OneToMany('Category', 'parent')
    children: Category[];

  @ManyToOne('Category', 'children')
    parent: Category;

  @OneToMany('Transaction', 'category')
    transactions: Transaction[];

  @Column({ name: 'created_at' })
    createdAt: Date;

  @Column({ name: 'updated_at' })
    updatedAt: Date;

  @Column({ name: 'deleted_at' })
    deletedAt: Date;
}
