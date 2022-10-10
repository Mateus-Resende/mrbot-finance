import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Generated } from "typeorm"
import { Category } from "./category.entity"

enum TransactionType {
  EXPENSE = 'expense',
  REVENUE = 'revenue',
  TRANSFER = 'transfer'
}

enum Currency {
  BRL = 'BRL',
  USD = 'USD',
  EUR = 'EUR'
}

@Entity({ name: 'transactions' })
export class Transaction {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @Column()
  name: string

  @Column()
  value: Number

  @Column()
  date: Date

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.BRL
  })
  currency: string

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.EXPENSE
  })
  type: string

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @Column({ name: 'deleted_at' })
  deletedAt: Date
}
