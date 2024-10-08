import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentials } from '../../../use-cases/errors/invalid-credentials-erros'
import { makeAuthenticateUseCase } from '../../../use-cases/factories/make-authenticate-use-case'

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
        const authenticateUseCase = makeAuthenticateUseCase()

        const { organization } = await authenticateUseCase.execute({
            email,
            password,
        })

        const authToken = await response.jwtSign(
            {},
            {
                sign: {
                    sub: organization.id,
                },
            },
        )

        return response.status(200).send({ authToken })

    } catch (err) {
        if (err instanceof InvalidCredentials) {
            return response.status(400).send({
                message: err.message,
            })
        }

        throw err
    }
}