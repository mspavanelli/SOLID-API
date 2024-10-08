import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { IUsersRepository } from '@/repositories/IUserRepository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface Params {
  name: string
  email: string
  password: string
}

interface Response {
  user: User
}

export class RegisterUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: Params): Promise<Response> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
