import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { PetsRepository } from '../pet-repository'

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }

    async findById(id: string) {
        const pet = await prisma.pet.findFirst({
            where: {
                id,
            },
        })

        return pet
    }
}