import { createServer } from "http";
import { Server } from "socket.io";
import initApp from "./server";
import { createMessage } from "./controllers/messageController";
import { IMessage } from "./models/messageModel";

const port = process.env.PORT || 3000;

initApp()
  .then((app) => {
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket: any) => {
      socket.on("new-message", (message: IMessage) => {
        createMessage(message);
        io.emit("update-messages", message);
      });

      socket.on("disconnect", () => {
        socket.broadcast.emit("clients", io.engine.clientsCount);
      });
    });

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing app:", error);
  });
