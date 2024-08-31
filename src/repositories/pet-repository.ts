import { Age, EnergyLevel, Pet, Size, Prisma } from '@prisma/client'

export interface SearchPetsProps {
    city: string
    age: Age | null
    energy_level: EnergyLevel | null
    size: Size | null
}
export interface PetsRepository {
    findById(id: string): Promise<Pet | null>
    findManyByQuery(data: SearchPetsProps): Promise<Pet[]>
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}