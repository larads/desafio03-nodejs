import { register } from './register'
import { FastifyInstance } from 'fastify'

export async function organizationRoutes(app: FastifyInstance) {
    app.post('/register', register)
}