import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import logger from "./core/pdLogger.js";
import connectionString from "./config/config.js";
import bodyParser from "body-parser";

import crudRoutes from "./routes/pdRoutes.js";
let app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", crudRoutes);
mongoose
  .connect(connectionString)
  .then(() => {
    logger.info("CONNECTED");
    app.listen(3000);
  })
  .catch((err) => {
    logger.error(err.message);
  });
