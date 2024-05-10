import { WatcherWebsocketServer } from "../watcher/watcher-ws-server";
import { say } from "./dependency-file";

console.log("starting server");

new WatcherWebsocketServer();

const content_server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/bundle.js")
      return new Response(Bun.file("./public/bundle.js"));
    if ("/index.html".startsWith(url.pathname))
      return new Response(Bun.file("./public/index.html"));
    return new Response("404");
  },
});

setTimeout(() => {
  console.log("Now? IDK if I like the pause");
}, 1000);

say();
