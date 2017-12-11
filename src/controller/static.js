const fs = require('fs');

const missingPageLoader = (response) => {
  response.writeHead(404, { 'Content-type': 'text/html' });

  const pageResponse = fs.readFileSync(`${process.cwd()}/src/views/404.html`);
  response.write(pageResponse);

  response.end();
};

const htmlLoader = (filename, response) => {
  try {
    const pageResponse = fs.readFileSync(`${process.cwd()}/src/views${filename}`);
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.write(pageResponse);
    response.end();
  } catch (err) {
    missingPageLoader(response);
  }
};


const cssLoader = (request, response) => {
  response.writeHead(200, { 'Content-type': 'text/css' });

  try {
    const cssFileContents = fs.readFileSync(`${process.cwd()}/public/css${request.url}`, { encoding: 'utf8' });
    response.write(cssFileContents);
  } catch (err) {
    response.write('');
  }

  response.end();
};

module.exports = {
  cssLoader,
  htmlLoader,
  missingPageLoader,
};
