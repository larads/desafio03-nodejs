import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { expect, it, describe, beforeEach } from 'vitest'
import { InvalidCredentials } from './errors/invalid-credentials-erros'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'

let sut: AuthenticateUseCase
let organizationRepository: InMemoryOrganizationsRepository

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationsRepository()

        sut = new AuthenticateUseCase(organizationRepository)
    })

    it('should be to authenticate', async () => {
        await organizationRepository.create({
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password_hash: await hash('1234567', 6),
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })

        const { organization } = await sut.execute({
            email: 'mariana@gmail.com',
            password: '1234567',
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await organizationRepository.create({
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password_hash: await hash('1234567', 6),
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })

        await expect(() =>
            sut.execute({
                email: 'email@example.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await organizationRepository.create({
            name: 'ORG Test',
            responsable_name: 'Mariana Lara',
            email: 'mariana@gmail.com',
            password_hash: await hash('abcdefg', 6),
            address: 'Rua teste',
            city: 'Typescript City',
            postal_code: '92000000',
        })

        await expect(() =>
            sut.execute({
                email: 'mariana@gmail.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentials)
    })
})