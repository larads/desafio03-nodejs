import { Pet, Age, EnergyLevel, Size } from '@prisma/client'
import { PetsRepository } from '../repositories/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrganizationsRepository } from '../repositories/organizations-repository'

interface RegisterNewPetUseCaseParams {
    name: string
    description: string | null
    age: Age
    energy_level: EnergyLevel
    size: Size
    organization_id: string
}

interface RegisterNewPetUseCaseResponse {
    pet: Pet
}


export class RegisterNewPetUseCase {
    constructor(
        private organizationRepository: OrganizationsRepository,
        private petsRepository: PetsRepository,
    ) { }

    async execute({
        name,
        description,
        age,
        energy_level,
        size,
        organization_id,
    }: RegisterNewPetUseCaseParams): Promise<RegisterNewPetUseCaseResponse> {
        const org = await this.organizationRepository.findById(organization_id)

        if (!org) {
            throw new ResourceNotFoundError()
        }

        const pet = await this.petsRepository.create({
            name,
            description,
            age,
            energy_level,
            size,
            organization_id,
        })

        return {
            pet,
        }
    }
}