import Server from "lume/core/server.ts";

const port = 8000;

const server = new Server({
  port,
  root: `${Deno.cwd()}/_site`,
});

server.start();

console.log(`Listening on http://localhost:${port}`);
