import { Hono } from "hono"
import { BackendOrchestratorQuerySchema } from "./schemas/backend-orchestrator-query-schema.js"
import { get } from "./clients/photo.js"

const app = new Hono()

app.all('*', async (c) => {
    const originalPath = c.req.path
    const queryParams = BackendOrchestratorQuerySchema.parse(c.req.query())

    const result = await get(originalPath, queryParams)
    return new Response(result, {
        headers: {
            "Content-Type": `image/png`
        }
    })
})

export default app;