import WebSocket, { WebSocketServer } from "ws";
import { Sub } from "./sub";
import { Pub } from "./pub";
import { Client } from "../models/client";

export class Con {
  private clients: Map<string, Client> = new Map();
  private publisher: Pub;
  private subscriber: Sub;

  constructor(private wss: WebSocketServer) {
    this.publisher = new Pub();
    this.subscriber = new Sub(this.publisher);

    wss.on("connection", (socket) => {
      this.handleCon(socket);
    });
  }

  handleCon(socket: WebSocket) {
    const clientid = Date.now().toString();
    const newclient: Client = { clientid: clientid, socket };
    this.clients.set(clientid, newclient);

    socket.on("message", (message) =>
      this.handleMessage(clientid, message.toString())
    );
    socket.on("close", () => this.handleDisconnect(clientid));
  }

  private handleMessage(clientId: string, message: string) {
    const parsedMessage = JSON.parse(message);
    const { action, topic, content } = parsedMessage;

    switch (action) {
      case "subscribe":
        this.subscriber.addSubscriber(clientId, topic);
        console.log(`Client ${clientId} subscribed to topic ${topic}`);
        break;
      case "unsubscribe":
        this.subscriber.removeSubscriber(clientId, topic);
        console.log(`Client ${clientId} unsubscribed from topic ${topic}`);
        break;
      case "publish":
        this.publisher.publish(topic, content, this.clients);
        console.log(`Published to topic ${topic}:`, content);
        break;
      case "view":
        this.subscriber.messageView(
          message,
          clientId,
          this.publisher.topics
        );
        break;
      default:
        console.log("Unknown action:", action);
    }
  }

  private handleDisconnect(clientid: string) {
    this.clients.delete(clientid);
    console.log(`Client ${clientid} disconnected`);
  }
}
