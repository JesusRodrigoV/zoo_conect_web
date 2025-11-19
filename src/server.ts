import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from "@angular/ssr/node";
import express from "express";
import { join } from "node:path";

import "dotenv/config";

const browserDistFolder = join(import.meta.dirname, "../browser");

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

app.get("/api/weather", async (req, res, next) => {
  const city = (req.query["city"] as string) || "La Paz";
  const apiKey = process.env["WEATHER_API_KEY"];

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "API Configuration Error: Key missing" });
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      return res
        .status(apiResponse.status)
        .json({ error: "Error fetching weather data" });
    }

    const data = await apiResponse.json();

    return res.json(data);
  } catch (error) {
    console.error("Error en el proxy:", error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: "1y",
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

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env["PORT"] || 4200;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Angular running on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or serverless platforms like Vercel.
 */
export const reqHandler = createNodeRequestHandler(app);

/**
 * Express app instance for serverless platforms
 */
export { app };

/**
 * Default export for compatibility with serverless platforms
 */
export default app;
