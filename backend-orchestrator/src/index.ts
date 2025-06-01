import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { get } from './clients/photo.js'
import { BackendOrchestratorQuerySchema } from './schemas/backend-orchestrator-query-schema.js'

const app = new Hono()

app.all('*', async (c) => {
  const originalPath = c.req.path
  const queryParams = BackendOrchestratorQuerySchema.parse(c.req.query())

  const result = await get(originalPath,queryParams)
  return new Response(result, {
    headers: {
        "Content-Type": `image/png`
    }
  })
})

serve({
  fetch: app.fetch,
  port: 4001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
