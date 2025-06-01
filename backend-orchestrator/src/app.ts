import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { BackendOrchestratorQuerySchema } from './schemas/backend-orchestrator-query-schema.js';
import { getWebsitePageScreenshot } from './clients/screenshot-taker.js';

const app = new Hono();

app.all(
    '*',
    zValidator('query', BackendOrchestratorQuerySchema),
    async (c) => {
        const path = c.req.path;
        const queryParams = c.req.valid('query');

        const result = await getWebsitePageScreenshot(path, queryParams);

        return new Response(result, {
            headers: {
                'Content-Type': 'image/png',
            },
        });
    }
);

export default app;
