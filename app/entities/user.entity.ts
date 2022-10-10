import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from "typeorm"
import { Account } from "./account.entity"
import { Category } from "./category.entity"

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'messenger_id' })
  messengerId: number

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
}
