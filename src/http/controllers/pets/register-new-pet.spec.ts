import { app } from 'src/app'
import request from 'supertest'
import { it, describe, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrganization } from '../../../utils/create-and-authenticate-organization'

describe('[e2e] - Register New Pet', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to register new pet in db', async () => {
        const { authToken } = await createAndAuthenticateOrganization(app)

        await request(app.server)
            .post('/register/pet')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Animal de teste',
                description: 'Pet muito calmo',
                age: 'FILHOTE',
                energy_level: 'CALM',
                size: 'MEDIUM',
            })
    })
})