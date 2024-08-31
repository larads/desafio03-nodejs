import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeRegisterNewPetUseCase } from '../../../use-cases/factories/make-register-new-pet-use-case'

export async function registerNewPet(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const registerNewPetBodySchema = z.object({
        name: z.string(),
        description: z.string().nullable(),
        age: z.enum(['FILHOTE', 'ADULTO', 'SENIOR']),
        energy_level: z.enum(['CALM', 'PEACEFUL', 'FUSSY']),
        size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    })

    const organizationId = request.user.sub

    const { name, description, age, energy_level, size } =
        registerNewPetBodySchema.parse(request.body)

    const registerNewPetUseCase = makeRegisterNewPetUseCase()

    const { pet } = await registerNewPetUseCase.execute({
        name,
        description,
        age,
        energy_level,
        size,
        organization_id: organizationId,
    })

    console.log(pet)

    return response.status(201).send({ pet })
}