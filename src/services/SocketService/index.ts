import { Server } from "socket.io";

class SocketService {
  private _connection;

  async init(server) {
    if (this._connection) {
      console.log(this.connection);
      throw new Error("Already initialized, use existing connection instead");
    }
    const socket = new Server(server);
    return new Promise((resolve, reject) => {
      socket.on("connection", (connection) => {
        this._connection = connection;
        try {
          resolve(this.connection);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  get connection() {
    if (!this._connection) {
      throw new Error("No active connection found");
    }
    return this._connection;
  }
}

export default new SocketService();
