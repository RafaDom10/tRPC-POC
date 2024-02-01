import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const trpc = initTRPC.create()
const publicProcedure = trpc.procedure;

export const router = trpc.router({
    getUsers: publicProcedure
    .output( z.array(
        z.object({
            id: z.number(),
            name: z.string()
        })
    ))
    .query( async () => {
        return [
            {
                id: 1,
                name: 'Josefina de Deus'
            },
            {
                id: 2,
                name: 'John Due'
            }
        ]
    }),
    getUser: publicProcedure
    .input(z.object({
        id: z.number()
    }))
    .query( async (request) => {
        return {
            id: request.input.id,
            name: 'Josefina de Deus'
        }
    })
})