import { Prisma, User } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { IUsersRepository } from '@/repositories/IUserRepository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
