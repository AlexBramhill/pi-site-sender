import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { ScreenshotQuerySchema } from './schemas/query-schema.js';
import { takeScreenshot } from './website-interface.js';

const app = new Hono();

app.get(
    '/',
    zValidator('query', ScreenshotQuerySchema),
    async (c) => {
        const query = c.req.valid('query');

        const screenshotBuffer = await takeScreenshot(query);

        c.header('Content-Type', `image/${query.format}`);
        return new Response(screenshotBuffer, {
            status: 200,
        });
    }
);

export default app;