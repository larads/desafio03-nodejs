import { app } from 'src/app'
import request from 'supertest'
import { it, describe, beforeAll, afterAll } from 'vitest'

describe('[e2e] - Register', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to register an organization', async () => {
        await request(app.server).post('/register').send({
            name: 'ORG - TEST',
            responsable_name: 'Register Test',
            email: 'funcionando4@email.com',
            password: '1234567',
            address: 'Rua dos testes',
            city: 'Porto Alegre',
            postal_code: '92000000',
        })
    })
})