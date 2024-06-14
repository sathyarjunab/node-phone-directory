import mongoose from "mongoose";

import data_chunks from "../constants/pd_constants.js";

import logger from "./pd_logger.js";

class repo {
  constructor() {
    this.connectionString = [
      "mongodb+srv://",
      data_chunks.DB_user,
      ":",
      data_chunks.DB_pass,
      "@cluster0.br6n1f3.mongodb.net/",
    ].join("");
    this.connect();
  }
  connect = async () => {
    await mongoose
      .connect(this.connectionString)
      .then(() => {
        logger.info("CONNECTED");
      })
      .catch((err) => {
        logger.error(err.message);
      });
  };

  getData = async (dir) => {
    return await dir
      .find()
      .then((Data) => {
        return Data;
      })
      .catch((err) => {
        logger.error(err.message);
      });
  };

  addData = async (body, dir) => {
    return await new dir({
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
  };

  updateData = async (id, body, dir) => {
    return await dir
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
  };
  deleteData = async (id, dir) => {
    return await dir
      .findByIdAndDelete(id)
      .then((res) => {
        return { delete: "DONE" };
      })
      .catch((err) => {
        logger.error(err.message);
      });
  };
}

export default new repo();
