import { GetSpecificPetUseCase } from '../get-specific-pet'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pet-repository'

export function makeGetSpecificPetUseCase() {
    const petRepository = new PrismaPetsRepository()

    const getSpecificPetUseCase = new GetSpecificPetUseCase(petRepository)

    return getSpecificPetUseCase
}