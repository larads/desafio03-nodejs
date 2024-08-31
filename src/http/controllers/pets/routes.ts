import { FastifyInstance } from 'fastify'

import { searchPets } from './search-pets'
import { registerNewPet } from './register-new-pet'
import { getSpecificPet } from './get-specific-pet'
import { searchAllPetsByCity } from './search-all-pets-by-city'

export async function petRoutes(app: FastifyInstance) {
    app.get('/pet/:id', getSpecificPet)
    app.get('/search/:city', searchPets)
    app.post('/register/pet', registerNewPet)
    app.get('/searchByCity/:city', searchAllPetsByCity)
}