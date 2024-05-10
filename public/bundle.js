// src/watcher/watcher-config.ts
var WatcherConfig;
(function(WatcherConfig) {
  WatcherConfig.client_entry_point = "./src/dummy-client/index.ts";
  WatcherConfig.client_output = "./public/bundle.js";
  WatcherConfig.ws_port = 3001;
})(WatcherConfig || (WatcherConfig = {}));

// src/watcher/watcher-ws-client.ts
class WatcherWebsocketClient {
  constructor() {
    const socket = new WebSocket("ws://localhost:" + WatcherConfig.ws_port);
    socket.onopen = () => {
      socket.onclose = () => {
        location.reload();
      };
    };
  }
}

// src/dummy-client/dependency-file copy.ts
function say2() {
  console.log("I'm a dependencyyyy number 222222");
}

// src/dummy-client/dependency-file.ts
function say() {
  console.log("I'm a dependencyyyyy");
  say2();
}

// src/dummy-client/index.ts
new WatcherWebsocketClient;
console.log("HERE in the client. Does this work?");
say();
