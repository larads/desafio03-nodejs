import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
    findById(id: string): Promise<Organization | null>
    findPetsByCity(city: string): Promise<Organization[]>
    findByEmail(email: string): Promise<Organization | null>
    create(data: Prisma.OrganizationCreateInput): Promise<Organization>
    findByEmailOrName(email: string, name: string): Promise<Organization | null>
}