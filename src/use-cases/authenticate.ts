import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'
import { InvalidCredentials } from './errors/invalid-credentials-erros'
import { OrganizationsRepository } from '../repositories/organizations-repository'

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    organization: Organization
}

export class AuthenticateUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) { }

    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const organization = await this.organizationsRepository.findByEmail(email)

        if (!organization) {
            throw new InvalidCredentials()
        }

        const doesPasswordMatches = await compare(
            password,
            organization.password_hash,
        )

        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        }

        return {
            organization,
        }
    }
}