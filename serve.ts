import cache_busting from "lume/middlewares/cache_busting.ts";
import expires from "lume/middlewares/expires.ts";
import Server from "lume/core/server.ts";

const port = 8000;

const server = new Server({
  port,
  root: `${Deno.cwd()}/_site`,
});

server
  .use(expires())
  .use(cache_busting());

server.start();

console.log(`Listening on http://localhost:${port}`);
