import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
    create(data: Prisma.OrganizationCreateInput): Promise<Organization>
    findByEmailOrName(email: string, name: string): Promise<Organization | null>
}