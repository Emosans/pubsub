import { Pub } from "./pub";

export class Sub{
    constructor(private pub: Pub){}

    addSubscriber(clientid:string,topic:string){
        this.pub.subscribe(clientid,topic);
    }

    removeSubscriber(clientid:string,topic:string){
        this.pub.unsubscribe(topic,clientid);
    }
}