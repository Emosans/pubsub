import { Client } from "../models/client";
import { Pub } from "./pub";

export class Sub {
  constructor(private pub: Pub) {}

  addSubscriber(clientid: string, topic: string) {
    this.pub.subscribe(clientid, topic);
  }

  removeSubscriber(clientid: string, topic: string) {
    this.pub.unsubscribe(topic, clientid);
  }

  messageView(
    message: string,
    clientid: string,
    topics: Map<string, Set<String>>
  ) {
    const subs = topics.get(clientid);
    const parseddmessage = JSON.parse(message);
    const { topic, content } = parseddmessage;
    console.log(topic, " : ", content);
  }
}
