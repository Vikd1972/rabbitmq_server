/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import type { Express, Router } from 'express-serve-static-core';
import requireDirectory from 'require-directory';

const routes = requireDirectory(module, {
  extensions: [__filename.slice(-2)],
}) as Record<string, { default: Router }>;

const setRoutes = (app: Express) => {
  Object.entries(routes).forEach(([routeName, route]) => {
    app.use(`/api/${routeName}`, route.default);
  });
};

export default setRoutes;
