import { hash } from 'bcryptjs'

import { IUsersRepository } from '@/repositories/IUserRepository'

interface Params {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: Params) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already in use')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
