import { Client } from "../models/client";

export class Pub {
  private topics: Map<string, Set<string>> = new Map();

  // chcek if ther exists a topic in topics
  // if no just createone and assign a map of set to it
  // if yes add the clientid to the set and store it as a subscriber
  subscribe(clientid: string, topic: string) {
    if (!this.topics.has(topic)) {
      this.topics.set(topic, new Set());
    } else {
      this.topics.get(topic)?.add(clientid);
    }
  }

  // delete clientid from topic
  unsubscribe(topic: string, clientid: string) {
    this.topics.get(topic)?.delete(clientid);
  }

  // create a method to publish
  // take client as param
  // check if topics has any set of clients for that topic(if not just make a new set)
  // check if topics has client id
  // target the client using clientid
  // send message
  publish(topic: string, message: string, clients: Map<string, Client>) {
    const subs = this.topics.get(topic) || new Set();
    subs.forEach((clientid) => {
      const client = clients.get(clientid);
      client?.socket.send(JSON.stringify({ topic, message }));
    });
  }
}
