const { https } = require('firebase-functions');
const { default: next } = require('next');

const isDevelopment = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDevelopment,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((request, response) => {
  return server.prepare().then(() => nextjsHandle(request, response));
});