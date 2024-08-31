import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetSpecificPetUseCase } from '../../../use-cases/factories/make-get-specific-pet-use-case'
import { PetNotExistingInDatabaseError } from 'src/use-cases/errors/pet-not-existing-in-database-error'

export async function getSpecificPet(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const getSpecificPetParamsSchema = z.object({
        id: z.string(),
    })

    const { id } = getSpecificPetParamsSchema.parse(request.params)

    try {
        const getSpecificPet = makeGetSpecificPetUseCase()

        const { pet } = await getSpecificPet.execute({
            petId: id,
        })

        response.status(200).send({ pet })
    } catch (err) {
        if (err instanceof PetNotExistingInDatabaseError) {
            return response.status(409).send({
                message: err.message,
            })
        }

        throw err
    }
}