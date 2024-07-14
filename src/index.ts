import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import { requestIdMiddleware } from "./Middleware/middleware";
import logger from "./Core/logger";
import connectionString from "./Config/config";
import Route from "./Routes/routes";

let crudRoutes = new Route().connect();

let app = express();

app.use(cors());

app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

app.use(requestIdMiddleware as express.RequestHandler);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", crudRoutes);
mongoose
  .connect(connectionString)
  .then(() => {
    logger.info("CONNECTED");
    app.listen(3000);
  })
  .catch((err) => {
    logger.error(err);
  });
