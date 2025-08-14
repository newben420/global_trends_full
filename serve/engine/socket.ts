import { Server, DefaultEventsMap, Socket } from 'socket.io';
import { Log } from '../lib/log';

export class SocketEngine {
    private static io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

    static initialize = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
        SocketEngine.io = io;
        SocketEngine.runOnce();
    }

    private static runOnce = () => {
        if (SocketEngine.io) {
            SocketEngine.io.on("connection", (socket) => {
                Log.dev(`Socket client connected with id ${socket.id}.`);

                socket.on("disconnect", () => {
                    Log.dev(`Socket client with id ${socket.id}.`);
                });
            });
        }
    }

    static broadcastUPDATE = (codes: string[]) => {
        if(SocketEngine.io){
            SocketEngine.io.emit("DATA_UPDATE", codes);
        }
    }
}