const { htmlLoader, cssLoader } = require('../controller/static.js');

const staticAssets = (router) => {
  router.get('/', (request, response) => {
    htmlLoader('/index.html', response);
  });

  router.get(/\/.*\.html/, (request, response) => {
    htmlLoader(request.url, response);
  });

  router.get(/\/.*\.css$/, (request, response) => {
    cssLoader(request, response);
  });

  return router;
};

module.exports = staticAssets;
