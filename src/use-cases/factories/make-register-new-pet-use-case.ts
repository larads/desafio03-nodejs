import { RegisterNewPetUseCase } from '../register-new-pet'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pet-repository'
import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'

export function makeRegisterNewPetUseCase() {
    const organizationRepository = new PrismaOrganizationsRepository()
    const petRepository = new PrismaPetsRepository()

    const registerNewPetUseCase = new RegisterNewPetUseCase(
        organizationRepository,
        petRepository,
    )

    return registerNewPetUseCase
}