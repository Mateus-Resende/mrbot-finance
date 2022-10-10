import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from "typeorm"
import { Account } from "./account"
import { Category } from "./category"

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ unique: true })
  username: string

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[]

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[]

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @Column({ name: 'deleted_at' })
  deletedAt: Date
}
