import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { expressHandler } from 'trpc-playground/handlers/express'
import { router } from './router';

const apiEndpoint = '/trpc'
const playgroundEndpoint = '/playground'

const runApp = async () => {
    const app = express()

    app.use(express.json())

    app.use(
        apiEndpoint,
        trpcExpress.createExpressMiddleware({
            router
        })
    )

    app.use(
        playgroundEndpoint,
        await expressHandler({
            trpcApiEndpoint: apiEndpoint,
            playgroundEndpoint,
            router
        })
    )

    app.listen(3000, () => console.log('Server is running at http://localhost:3000'))

}

runApp()