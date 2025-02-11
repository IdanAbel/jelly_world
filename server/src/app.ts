import { createServer } from "http";
import { Server } from "socket.io";
import initApp from "./server";
import { createMessage } from "./controllers/messageController";
import { IMessage } from "./models/messageModel";
import https from "https";
import fs from "fs"


const port = process.env.PORT || 443;

initApp()
  .then((app) => {
      if(process.env.NODE_ENV != "production"){
        const server = createServer(app);
    server.listen(port, () => {
      console.log(`Server is running on http:/localhost:${port}`);
    });

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
      }
      else {

    const prop = {
      key: fs.readFileSync("./client-key.pem"),
      cert: fs.readFileSync("./client-cert.pem")
    }
    const server = https.createServer(prop,app).listen(port);
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
  }
  })
  .catch((error) => {
    console.error("Error initializing app:", error);
  });
