import { api } from './../serve/api';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { Log } from './../serve/lib/log';
import { startEngine, stopEngine } from './../serve/engine/terminal';
import { Site } from './../serve/site';
import { enableProdMode } from '@angular/core';

const browserDistFolder = join(import.meta.dirname, '../browser');

if(Site.PRODUCTION){
  enableProdMode();
}

const app = express();
const angularApp = new AngularNodeAppEngine();

process.on('exit', async (code) => {
  // NOTHING FOR NOW
});

process.on('SIGINT', async () => {
  Log.dev('Process > Received SIGINT.');
  const l = await stopEngine();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  Log.dev('Process > Received SIGTERM.');
  const l = await stopEngine();
  process.exit(0);
});

process.on('uncaughtException', async (err) => {
  Log.dev('Process > Unhandled exception caught.');
  console.log(err);
  if (Site.EXIT_ON_UNCAUGHT_EXCEPTION) {
    const l = await stopEngine();
    process.exit(0);
  }
});

process.on('unhandledRejection', async (err, promise) => {
  Log.dev('Process > Unhandled rejection caught.');
  console.log("Promise:", promise);
  console.log("Reason:", err);
  if (Site.EXIT_ON_UNHANDLED_REJECTION) {
    const l = await stopEngine();
    process.exit(0);
  }
});

app.use("/api", api);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

Log.flow([Site.TITLE, 'Attempting to start engines.'], 0);
startEngine().then(r => {
  if (r) {
    Log.flow([Site.TITLE, 'Sucessfully started all engines.'], 0);
  }
  else {
    Log.flow([Site.TITLE, 'Failed to start all engines.'], 0);
    process.exit(0);
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  app.listen(Site.PORT, (error) => {
    if (error) {
      throw error;
    }
    Log.flow([Site.TITLE, `Running at http://127.0.0.1:${Site.PORT}`], 0);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
