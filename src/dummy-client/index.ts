import { WatcherWebsocketClient } from "../watcher/watcher-ws-client";
import { say } from "./dependency-file";

new WatcherWebsocketClient();

console.log("HERE in the client. Does this work?");

say();
