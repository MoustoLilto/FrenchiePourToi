import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
    AngularNodeAppEngine,
    createNodeRequestHandler,
    isMainModule,
    writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
    const context = getContext();
    const url = new URL(request.url);

    // Gestion des locales
    const path = url.pathname;
    let locale = 'fr'; // locale par défaut

    if (path.startsWith('/en')) {
        locale = 'en';
    } else if (path.startsWith('/fr')) {
        locale = 'fr';
    }

    // Ajout de la locale au contexte
    context.locale = locale;

    const result = await angularAppEngine.handle(request, context);
    return result || new Response('Not found', { status: 404 });
}

app.use(
    express.static(browserDistFolder, {
        maxAge: '1y',
        index: false,
        redirect: false,
    })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', async (req, res, next) => {
    try {
        // Conversion de la requête Express en Request standard
        const request = new Request(`http://${req.headers.host}${req.url}`, {
            method: req.method,
            headers: new Headers(req.headers as Record<string, string>),
            body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
        });

        const result = await angularAppEngine.handle(request);
        if (result) {
            res.status(result.status);
            for (const [key, value] of result.headers) {
                res.setHeader(key, value);
            }
            res.send(await result.text());
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
    const port = process.env['PORT'] || 4000;
    app.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
