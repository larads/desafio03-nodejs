import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async create(data: Prisma.OrganizationCreateInput) {
        const organization = await prisma.organization.create({
            data,
        })

        return organization
    }

    async findByEmailOrName(email: string, name: string) {
        const organization = await prisma.organization.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            equals: email,
                        },
                    },
                    {
                        name: {
                            equals: name,
                        },
                    },
                ],
            },
        })

        return organization
    }

    async findByEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                email,
            },
        })

        return organization
    }
}