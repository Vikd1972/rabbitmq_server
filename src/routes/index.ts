import type { Express, Router } from 'express';
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
