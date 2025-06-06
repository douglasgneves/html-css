// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Esta é a forma recomendada de instanciar o PrismaClient em um ambiente Next.js
// para evitar criar múltiplas conexões com o banco de dados durante o
// hot-reloading em desenvolvimento.

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export { prisma }

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma