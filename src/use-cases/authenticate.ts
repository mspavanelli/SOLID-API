import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { IUsersRepository } from '@/repositories/IUserRepository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-errors'

interface Input {
  email: string
  password: string
}

interface Outpup {
  user: User
}

export class AuthenticateUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute({ email, password }: Input): Promise<Outpup> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
