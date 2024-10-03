import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface Params {
  name: string
  email: string
  password: string
}

export async function registerUseCase({ email, name, password }: Params) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already in use')
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })
}
