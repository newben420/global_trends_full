import { SocketEngine } from './../serve/engine/socket';
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
import https from 'https';
import http from 'http';
import { Site } from './../serve/site';
if (Site.FORCE_FAMILY_4()) {
  https.globalAgent.options.family = 4;
}
import { Server } from 'socket.io';
import { enableProdMode, REQUEST, RESPONSE_INIT as RESPONSE } from '@angular/core';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { CookieEngine } from '../serve/engine/cookie';
import { allowedCookies } from '../serve/model/allowedCookies';


const browserDistFolder = join(import.meta.dirname, '../browser');

if(Site.PRODUCTION()){
  enableProdMode();
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);
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
  if (Site.EXIT_ON_UNCAUGHT_EXCEPTION()) {
    const l = await stopEngine();
    process.exit(0);
  }
});

process.on('unhandledRejection', async (err, promise) => {
  Log.dev('Process > Unhandled rejection caught.');
  console.log("Promise:", promise);
  console.log("Reason:", err);
  if (Site.EXIT_ON_UNHANDLED_REJECTION()) {
    const l = await stopEngine();
    process.exit(0);
  }
});

app.disable("x-powered-by");
app.disable('etag');

app.use(bodyParser.json({ limit: "35mb" }));

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "35mb",
        parameterLimit: 50000,
    })
);

app.use(cookieParser(Site.AUTH_COOKIE_SECRET(), CookieEngine.cookieOpts()));

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
  const cookies = Object.fromEntries(Object.keys(allowedCookies).map(x => ([x, CookieEngine.getCookie(x, req)])));
  angularApp
    .handle(req, {
      cookies,
      brand: Site.BRAND(),
      top: Site.TRENDS_TOP_NUMBER(),
      year: (new Date()).getFullYear(),
      support: Site.SUPPORT_URL(),
    })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

Log.flow([Site.TITLE(), 'Attempting to start engines.'], 0);
startEngine().then(r => {
  if (r) {
    Log.flow([Site.TITLE(), 'Sucessfully started all engines.'], 0);
  }
  else {
    Log.flow([Site.TITLE(), 'Failed to start all engines.'], 0);
    process.exit(0);
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  server.listen(Site.PORT(), (error?: any) => {
    if (error) {
      throw error;
    }
    else{
      SocketEngine.initialize(io);
    }
    Log.flow([Site.TITLE(), `Running at http://127.0.0.1:${Site.PORT()}`], 0);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
