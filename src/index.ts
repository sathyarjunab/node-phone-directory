import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import logger from "./core/Logger";
import connectionString from "./config/Config";
import Route from "./routes/Routes";

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
