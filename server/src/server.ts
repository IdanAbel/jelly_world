import dotenv from "dotenv";
dotenv.config();
import { join } from "path";
import mongoose from "mongoose";
import express, { Express } from "express";
import authRoutes from "./routes/authRoute";
import candyRoute from "./routes/candyRoute";
import messageRoute from "./routes/messageRoute";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import uploadRoutes from "./routes/uploadRoutes";
import chatBotRoute from "./routes/chatBotRoute";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Cross-Origin-Opener-Policy", "unsafe-none");
  res.header("Cross-Origin-Embedder-Policy", "unsafe-none");

  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/candy", candyRoute);
app.use("/api/messages", messageRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api/chatbot", chatBotRoute);
app.use("/assets", express.static("assets"));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Dev 2025 REST API",
      version: "1.0.0",
      description: "REST server including authentication using JWT",
    },
    servers: [{ url: "http://localhost:3000" }, { url: "http://10.10.246.63" }, 
      { url: "https://10.10.246.63" }, {url: "http://node63.cs.colman.ac.il"}
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use(express.static("front"));


app.use(notFound);
app.use(errorHandler);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const initApp = () => {
  return new Promise<Express>((resolve, reject) => {
    if (!process.env.DB_CONNECT) {
      reject("DB_CONNECT is not defined in .env file");
    } else {
      mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => {
          resolve(app);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

export default initApp;