import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { RegisterUseCase } from './register'

describe('use-case > register', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null
      },
      async create(data) {
        return {
          id: '123',
          email: data.email,
          name: data.name,
          password_hash: data.password_hash,
          crested_at: new Date(),
        }
      },
    })
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123',
    })

    const isPasswordHashValid = await compare('123', user.password_hash)

    expect(isPasswordHashValid).toBeTruthy()
  })
})
