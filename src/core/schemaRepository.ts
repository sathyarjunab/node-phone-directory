import { add } from "winston";
import logger from "./pdLogger.js";

interface Repo {
  getData: (dir: any) => Promise<any>;
  addData: (body: any, dir: any) => Promise<any>;
  updateData: (id: string, body: any, dir: any) => Promise<any>;
  deleteData: (id: string, dir: any) => Promise<any>;
}

class schemaRepository implements Repo {
  getData(dir: any) {
    return dir
      .find()
      .then((Data: any) => {
        return Data;
      })
      .catch((err: any) => {
        logger.error(err.message);
      });
  }

  addData(body: any, dir: any) {
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
      add,
    })
      .save()
      .then(() => {
        return { dataAdded: "DONE" };
      })
      .catch((err: any) => {
        logger.error(err.message);
      });
  }

  updateData(id: string, body: any, dir: any) {
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
      .then(() => {
        return { update: "DONE" };
      })
      .catch((err: any) => {
        logger.error(err.message);
      });
  }
  deleteData(id: string, dir: any) {
    return dir
      .findByIdAndDelete(id)
      .then(() => {
        return { delete: "DONE" };
      })
      .catch((err: any) => {
        logger.error(err.message);
      });
  }
}

export default schemaRepository;
