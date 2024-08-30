import { RegisterUseCase } from '../register'
import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'

export function makeRegisterUseCase() {
    const organizationRepository = new PrismaOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(organizationRepository)

    return registerUseCase
}