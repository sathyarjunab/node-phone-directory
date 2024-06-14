import express from "express";

import bodyParser from "body-parser";

import crud_routes from "./routes/pd_routes.js";
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", crud_routes);

app.listen(3000);
