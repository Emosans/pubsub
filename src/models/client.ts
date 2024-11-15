import WebSocket from "ws";

// create interface for the client to follow
export interface Client {
  clientid: string;
  socket: WebSocket;
}
