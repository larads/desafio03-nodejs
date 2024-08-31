import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetSpecificPetUseCase } from '../../../use-cases/factories/make-get-specific-pet-use-case'

export async function getSpecificPet(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const getSpecificPetParamsSchema = z.object({
        id: z.string(),
    })

    const { id } = getSpecificPetParamsSchema.parse(request.params)

    const getSpecificPet = makeGetSpecificPetUseCase()

    const { pet } = await getSpecificPet.execute({
        petId: id,
    })

    console.log(pet)

    response.status(201).send({ pet })
}