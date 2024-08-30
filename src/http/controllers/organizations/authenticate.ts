import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateUseCase } from '../../../use-cases/authenticate'
import { InvalidCredentials } from '../../../use-cases/errors/invalid-credentials-erros'
import { PrismaOrganizationsRepository } from '../../../repositories/prisma/prisma-organizations-repository'

export async function authenticate(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const organizationRepository = new PrismaOrganizationsRepository()
        const authenticateUseCase = new AuthenticateUseCase(organizationRepository)

        await authenticateUseCase.execute({
            email,
            password,
        })
    } catch (err) {
        if (err instanceof InvalidCredentials) {
            return response.status(400).send({
                message: err.message,
            })
        }

        throw err
    }

    return response.status(200).send()
}