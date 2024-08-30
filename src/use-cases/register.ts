import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { OrganizationAlreadyExists } from './errors/organization-already-exists-error'

interface RegisterUseCaseParams {
    name: string
    responsable_name: string
    email: string
    password: string
    address: string
    city: string
    postal_code: string
}

export class RegisterUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) { }

    async execute({
        name,
        responsable_name,
        email,
        password,
        address,
        city,
        postal_code,
    }: RegisterUseCaseParams) {
        const password_hash = await hash(password, 6)

        const organizationWithSameEmailOrName =
            await this.organizationsRepository.findByEmailOrName(email, name)

        if (organizationWithSameEmailOrName) {
            throw new OrganizationAlreadyExists()
        }

        await this.organizationsRepository.create({
            name,
            responsable_name,
            email,
            password_hash,
            address,
            city,
            postal_code,
        })
    }
}