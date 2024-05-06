import type { ServerWebSocket } from "bun";
import { WatcherConfig } from "./watcher-config";
import fs from "fs";

export class WatcherWebsocketServer {
  private websockets: ServerWebSocket<unknown>[] = [];

  constructor() {
    const ws_server = Bun.serve({
      fetch(req, server) {
        if (server.upgrade(req)) {
          return;
        }
        return new Response("Upgrade failed", { status: 500 });
      },
      websocket: {
        open: (ws) => {
          this.websockets.push(ws);
        },
        message() {},
        idleTimeout: undefined,
      },
      port: WatcherConfig.ws_port,
    });

    console.log("Starting ws server on " + ws_server.url);

    const client_content_watcher = fs.watch(WatcherConfig.client_output);
    client_content_watcher.on("change", () => {
      this.boot_clients();
    });
  }

  protected boot_clients() {
    for (const ws of this.websockets) {
      ws.close();
    }
    this.websockets = [];
  }
}
