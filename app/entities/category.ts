import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Generated } from "typeorm"
import { Transaction } from "./transaction"
import { User } from "./user"

@Entity({ name: 'categories' })
export class Category {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @Column()
  name: string

  @Column()
  code: string

  @Column({ name: 'spending_limit' })
  spendingLimit: Number

  @Column({ name: 'current_spent' })
  current_spent: Number

  @ManyToOne(() => User, (user) => user.categories)
  user: User

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[]

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[]

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @Column({ name: 'deleted_at' })
  deletedAt: Date
}
