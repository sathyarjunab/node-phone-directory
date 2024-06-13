let mongoose = require("mongoose");

// let data_chunks = require("../constants/pd_constants");

class repo {
  constructor() {
    // this.connectionString = [
    //   "mongodb+srv://",
    //   data_chunks.DB_user,
    //   ":",
    //   data_chunks.DB_pass,
    //   "@cluster0.br6n1f3.mongodb.net/",
    // ].join();
    this.connect();
  }
  connect = async () => {
    await mongoose
      .connect(
        "mongodb+srv://sathyarjun007:SSgafPRhTbgsRWL0@cluster0.br6n1f3.mongodb.net/"
      )
      .then(() => {
        console.log("!!!!!!!!!CONNECTED!!!!!!!!!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData = async (dir) => {
    return await dir
      .find()
      .then((Data) => {
        return Data;
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
        return err;
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
        console.log(err);
      });
  };
  deleteData = async (id, dir) => {
    return await dir
      .findByIdAndDelete(id)
      .then((res) => {
        return { delete: "DONE" };
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };
}

module.exports = new repo();
