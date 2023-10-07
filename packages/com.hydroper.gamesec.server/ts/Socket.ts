import { EventEmitter } from "com.hydroper.gamesec.util";
import { WebSocket } from "ws";
import Message from "./Message";
import CloseEvent from "./events/CloseEvent";

/**
 * Connection from a client.
 */
export default class Socket {
    constructor(readonly socket: WebSocket) {
        this.socket.on("close", reason => {
            this.onClose.emit(new CloseEvent(reason));
        });
        this.socket.on("message", (data, isBinary) => {
            if (isBinary) {
                if (data instanceof Buffer) {
                    this.onMessage.emit({
                        type: "binary",
                        data: data as Buffer,
                    });
                } else {
                    for (const buffer of data as Buffer[]) {
                        this.onMessage.emit({
                            type: "binary",
                            data: buffer,
                        });
                    }
                }
            } else {
                this.onMessage.emit({
                    type: "text",
                    data: data.toString("utf8"),
                });
            }
        });
    }

    /**
     * When the client closes the connection.
     */
    readonly onClose = new EventEmitter<CloseEvent>();

    /**
     * When a message is received from the client.
     */
    readonly onMessage = new EventEmitter<Message>();

    /**
     * Closes the client.
     */
    close(reason: number) {
        this.socket.close(reason);
    }
}