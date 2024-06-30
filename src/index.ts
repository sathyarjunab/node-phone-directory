import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import logger from "./Core/Logger";
import connectionString from "./Config/Config";
import Route from "./Routes/Routes";

let crudRoutes = new Route().connect();

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
