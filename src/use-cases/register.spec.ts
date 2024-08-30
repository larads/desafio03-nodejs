import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { expect, it, describe, beforeEach } from 'vitest'
import { OrganizationAlreadyExists } from './errors/organization-already-exists-error'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'

let sut: RegisterUseCase
let organizationRepository: InMemoryOrganizationsRepository

describe('Register Org Use Case', () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationsRepository()

        sut = new RegisterUseCase(organizationRepository)
    })

    it('should be able to register a new organization', async () => {
        const { organization } = await sut.execute({
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password: '1234567',
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should hash org password upon registration', async () => {
        const { organization } = await sut.execute({
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password: '1234567',
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })

        const isPasswordCorrectlyHashed = await compare(
            '1234567',
            organization.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'mariana@gmail.com'

        await sut.execute({
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email,
            password: '1234567',
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })

        await expect(() =>
            sut.execute({
                name: 'ORG Test [2]',
                responsable_name: 'Mariana Lara',
                email,
                password: '1234567',
                address: 'Rua teste',
                city: 'Typescript City',
                postal_code: '92000000',
            }),
        ).rejects.toBeInstanceOf(OrganizationAlreadyExists)
    })

    it('should not be able to register an organization with same name twice', async () => {
        const name = 'ORG Test'

        await sut.execute({
            name,
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password: '1234567',
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })

        await expect(() =>
            sut.execute({
                name,
                responsable_name: 'Mariana Lara',
                email: 'mariana@gmail.com',
                password: '1234567',
                address: 'Rua teste',
                city: 'Typescript City',
                postal_code: '92000000',
            }),
        ).rejects.toBeInstanceOf(OrganizationAlreadyExists)
    })
})