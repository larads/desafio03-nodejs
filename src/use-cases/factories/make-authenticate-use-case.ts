import { AuthenticateUseCase } from '../authenticate'
import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'

export function makeAuthenticateUseCase() {
    const organizationRepository = new PrismaOrganizationsRepository()
    const authenticateUseCase = new AuthenticateUseCase(organizationRepository)

    return authenticateUseCase
}