import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUseCase } from 'src/use-cases/factories/make-register-use-case'
import { OrganizationAlreadyExists } from '../../../use-cases/errors/organization-already-exists-error'

export async function register(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const registerBodySchema = z.object({
        name: z.string(),
        responsable_name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string(),
        city: z.string(),
        postal_code: z.string(),
    })

    const {
        name,
        responsable_name,
        email,
        password,
        address,
        city,
        postal_code,
    } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            responsable_name,
            email,
            password,
            address,
            city,
            postal_code,
        })
    } catch (err) {
        if (err instanceof OrganizationAlreadyExists) {
            return response.status(409).send({
                message: err.message,
            })
        }

        throw err
    }

    return response.status(201).send()
}