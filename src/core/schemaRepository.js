import mongoose from "mongoose";

import connectionString from "../config/config.js";
import logger from "./pd_logger.js";

class schemaRepository {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(connectionString)
      .then(() => {
        logger.info("CONNECTED");
      })
      .catch((err) => {
        logger.error(err.message);
      });
  }

  getData(dir) {
    return dir
      .find()
      .then((Data) => {
        return Data;
      })
      .catch((err) => {
        logger.error(err.message);
      });
  }

  addData(body, dir) {
    return new dir({
      name: body.name,
      phone_number: body.number,
      work: body.work,
      email: body.email,
    })
      .save()
      .then((res) => {
        return { data_Added: "DONE" };
      })
      .catch((err) => {
        logger.error(err.message);
      });
  }

  updateData(id, body, dir) {
    return dir
      .findByIdAndUpdate(id, {
        name: body.name,
        phone_number: body.number,
        work: body.work,
        email: body.email,
      })
      .then((res) => {
        return { update: "DONE" };
      })
      .catch((err) => {
        logger.error(err.message);
      });
  }
  deleteData(id, dir) {
    return dir
      .findByIdAndDelete(id)
      .then((res) => {
        return { delete: "DONE" };
      })
      .catch((err) => {
        logger.error(err.message);
      });
  }
}

export default new schemaRepository();
