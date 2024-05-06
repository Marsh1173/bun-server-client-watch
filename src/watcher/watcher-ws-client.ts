import { WatcherConfig } from "./watcher-config";

export class WatcherWebsocketClient {
  constructor() {
    const socket = new WebSocket("ws://localhost:" + WatcherConfig.ws_port);
    socket.onopen = () => {
      socket.onclose = () => {
        location.reload();
      };
    };
  }
}
