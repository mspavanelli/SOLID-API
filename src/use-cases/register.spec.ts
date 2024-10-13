import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/InMemoryUsersRepository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

describe('use-case > register', () => {
  let userRepository: InMemoryUsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123',
    })
    expect(user.id).toBeDefined()
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123',
    })
    const isPasswordHashValid = await compare('123', user.password_hash)
    expect(isPasswordHashValid).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@mail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123',
    })

    expect(() =>
      sut.execute({
        name: 'John Doe A',
        email,
        password: '123A',
      }),
    ).rejects.toThrow(UserAlreadyExistsError)
  })
})
