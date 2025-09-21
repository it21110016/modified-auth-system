const proxy = require('express-http-proxy');

const setupProxies = (app, routes) => {
  routes.forEach(({ name, path, target }) => {
    app.use(
      path,
      logProxy(name),
      proxy(target, {
        proxyReqPathResolver: (req) => `${path}${req.url}`,
        proxyErrorHandler: (err, res, next) => {
          console.error(`[Gateway] Proxy error in ${name}:`, err.message);
          res.status(500).json({ message: 'Internal Gateway Error' });
        },
      })
    );
  });
};

// Logger middleware
const logProxy = (serviceName) => (req, res, next) => {
  console.log(`[Gateway] Proxying to ${serviceName}: ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = setupProxies;
