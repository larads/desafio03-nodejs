import 'dotenv/config'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable.')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    async setup() {
        // Gerando um banco de dados único para cada switch de testes
        const schema = randomUUID()
        const databaseURL = generateDatabaseURL(schema)

        // Sobreescrevendo as variáveis de ambiente
        process.env.DATABASE_URL = databaseURL

        // Rodando as migrations
        // a flag deploy é para o prisma não fazer uma comparação com os bancos antigos

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
                )

                await prisma.$disconnect()
            },
        }
    },
}