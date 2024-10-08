import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchAllPetsInASpecificCityUseCase } from '../../../use-cases/factories/make-fetch-all-pets-in-a-specific-city-use-case'

export async function searchAllPetsByCity(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const searchPetsParamsSchema = z.object({
        city: z.string(),
    })

    const { city } = searchPetsParamsSchema.parse(request.params)

    const searchPetsByCityUseCase = makeFetchAllPetsInASpecificCityUseCase()

    const { pets } = await searchPetsByCityUseCase.execute({
        city,
    })

    return response.status(200).send({
        pets,
    })
}