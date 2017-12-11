const cluster = require('cluster');
const os = require('os');
const http = require('http');
const Router = require('router');
const staticAssets = require('./src/router/static-assets.js');
const { missingPageLoader } = require('./src/controller/static.js');

const router = staticAssets(Router());

if (cluster.master) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i += 1) cluster.fork();

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((request, response) => {
    router(request, response, () => { missingPageLoader(response); });
  }).listen(3000);
}

