const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 4000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      console.log(2222);
      console.log(pathname);
      console.log(query);

      if (pathname === '/tag') {
        await app.render(req, res, '/user/2', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.log('error', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running at：http://${hostname}:${port}`);
  });
});
