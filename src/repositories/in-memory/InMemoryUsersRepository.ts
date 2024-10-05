import { Prisma, User } from '@prisma/client'

import { IUsersRepository } from '@/repositories/IUserRepository'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '123',
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      crested_at: new Date(),
    }
    this.users.push(user)
    return user
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null
  }
}
