import { WebSocketServer } from 'ws';
import http from "http";
import https from "https";
import { EventEmitter } from 'com.hydroper.gamesec.util';
import Socket from "./Socket";

export type ServerOptions = {
    port?: number,
    server?: http.Server | https.Server,
};

/**
 * A WebSocket server.
 */
export default class Server {
    private readonly wss: WebSocketServer;

    /**
     * When the server is closed.
     */
    readonly onClose = new EventEmitter<void>();

    /**
     * When a new client connects to the server.
     */
    readonly onConnection = new EventEmitter<Socket>();

    /**
     * When the underlying server has been bound.
     */
    readonly onListening = new EventEmitter<void>();

    constructor({port, server}: ServerOptions) {
        this.wss = new WebSocketServer({
            port,
            server,
        });
        this.wss.on("close", () => {
            this.onClose.emit(undefined);
        });
        this.wss.on("listening", () => {
            this.onListening.emit(undefined);
        });
        this.wss.on("connection", socket => {
            this.onConnection.emit(new Socket(socket));
        });
    }
}