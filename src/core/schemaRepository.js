import logger from "./pdLogger.js";

class schemaRepository {
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

  addData(body, dir, time) {
    let now = new Date();
    return new dir({
      name: body.name,
      phone_number: body.phoneNumber,
      mobile_number: body.mobileNumber,
      teliphone_number: body.teliphoneNumber,
      work: body.work,
      email: body.email,
      created_time: now.toString(),
      updated_time: now.toString(),
    })
      .save()
      .then((res) => {
        return { dataAdded: "DONE" };
      })
      .catch((err) => {
        logger.error(err.message);
      });
  }

  updateData(id, body, dir, time) {
    let now = new Date();
    return dir
      .findByIdAndUpdate(id, {
        name: body.name,
        phone_number: body.phoneNumber,
        mobile_number: body.mobileNumber,
        teliphone_number: body.teliphoneNumber,
        work: body.work,
        email: body.email,
        updated_time: now.toString(),
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
