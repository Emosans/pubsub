import { WebSocketServer } from "ws";
import { Con } from "./conn";

export class Server{
    constructor(port:number){
        const wss = new WebSocketServer({port});
        new Con(wss);
        console.log(`Running on port ${port}`)
    }
}