import { register } from './register'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'

export async function organizationRoutes(app: FastifyInstance) {
    app.post('/register', register)
    app.post('/session', authenticate)
}