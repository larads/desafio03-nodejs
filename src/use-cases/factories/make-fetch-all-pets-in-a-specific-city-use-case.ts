import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pet-repository'
import { FetchAllPetsInASpecificCityUseCase } from '../fetch-all-pets-in-a-specific-city'
import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'

export function makeFetchAllPetsInASpecificCityUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const organizationRepository = new PrismaOrganizationsRepository()

    const fetchAllPetsInCityUseCase = new FetchAllPetsInASpecificCityUseCase(
        petsRepository,
        organizationRepository,
    )

    return fetchAllPetsInCityUseCase
}