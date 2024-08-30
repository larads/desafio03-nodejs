import { env } from './env'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { organizationRoutes } from './http/controllers/organizations/routes'
import { petRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(petRoutes)
app.register(organizationRoutes)

app.setErrorHandler((error, _request, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: 'Validation error.',
            issues: error.format(),
        })
    }

    //erro mostrado caso n esteja em produção
    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return response.status(500).send({ message: 'Internal Server Error.' })
})