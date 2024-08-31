import { hash } from 'bcryptjs'
import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterNewPetUseCase } from './register-new-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'

let sut: RegisterNewPetUseCase
let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository

describe('Register New Pet Use Case', () => {
    beforeEach(async () => {

        organizationRepository = new InMemoryOrganizationsRepository()
        petRepository = new InMemoryPetsRepository()

        sut = new RegisterNewPetUseCase(organizationRepository, petRepository)

        await organizationRepository.create({
            id: 'organization-1',
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password_hash: await hash('1234567', 6),
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })
    })

    it('should be able to register a new pet', async () => {
        const { pet } = await sut.execute({
            name: 'ORG Test',
            description: 'Pet muito calmo',
            age: 'FILHOTE',
            energy_level: 'CALM',
            size: 'MEDIUM',
            organization_id: 'organization-1',
        })
        expect(pet.id).toEqual(expect.any(String))
    })

    it('should be able to register a new pet without description', async () => {
        const { pet } = await sut.execute({
            name: 'ORG Test',
            description: null,
            age: 'FILHOTE',
            energy_level: 'CALM',
            size: 'MEDIUM',
            organization_id: 'organization-1',
        })

        expect(pet.id).toEqual(expect.any(String))
    })

    it('should not be able to register a new pet without a valid organization', async () => {
        await expect(() =>
            sut.execute({
                name: 'ORG Test',
                description: 'Pet muito calmo',
                age: 'FILHOTE',
                energy_level: 'CALM',
                size: 'MEDIUM',
                organization_id: 'organization-invalid',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to register a new pet with invalid age data', async () => {
        await expect(() =>
            sut.execute({
                name: 'ORG Test',
                description: 'Pet muito calmo',
                age: 'FILHOTE',
                energy_level: 'CALM',
                size: 'MEDIUM',
                organization_id: 'organization-invalid',
            }),
        ).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to register a new pet with invalid energy_level data', async () => {
        await expect(() =>
            sut.execute({
                name: 'ORG Test',
                description: 'Pet muito calmo',
                age: 'FILHOTE',
                energy_level: 'FUSSY',
                size: 'MEDIUM',
                organization_id: 'organization-invalid',
            }),
        ).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to register a new pet with invalid SIZE data', async () => {
        await expect(() =>
            sut.execute({
                name: 'ORG Test',
                description: 'Pet muito calmo',
                age: 'FILHOTE',
                energy_level: 'CALM',
                size: 'SMALL',
                organization_id: 'organization-invalid',
            }),
        ).rejects.toBeInstanceOf(Error)
    })
})