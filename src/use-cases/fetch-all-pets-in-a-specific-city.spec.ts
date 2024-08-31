import { hash } from 'bcryptjs'
import { expect, it, describe, beforeEach } from 'vitest'
import { FetchAllPetsInASpecificCityUseCase } from './fetch-all-pets-in-a-specific-city'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'

let petRepository: InMemoryPetsRepository
let sut: FetchAllPetsInASpecificCityUseCase
let organizationRepository: InMemoryOrganizationsRepository

describe('Search pets by city Use Case', () => {
    beforeEach(() => {
        petRepository = new InMemoryPetsRepository()
        organizationRepository = new InMemoryOrganizationsRepository()

        sut = new FetchAllPetsInASpecificCityUseCase(
            petRepository,
            organizationRepository,
        )
    })

    it('should be able to list all pets based in city', async () => {
        const organization = await organizationRepository.create({
            id: 'org 01',
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password_hash: await hash('123456', 6),
            address: 'Rua dos testes',
            city: 'Porto Alegre',
            postal_code: '92000000',
        })

        await organizationRepository.create({
            id: 'org 02',
            name: 'ORG Test 2',
            responsable_name: 'Mariana Lara',
            email: 'mariana2@gmail.com',
            password_hash: await hash('123456', 6),
            address: 'Rua dos testes',
            city: 'Canoas',
            postal_code: '92000000',
        })

        petRepository.create({
            name: 'pet test - 02',
            description: 'Pet muito calmo',
            age: 'FILHOTE',
            energy_level: 'CALM',
            size: 'MEDIUM',
            organization_id: organization.id,
        })

        const { pets } = await sut.execute({ city: 'Canoas' })

        expect(pets).toHaveLength(1)
    })
})