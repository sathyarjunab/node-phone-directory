import { Model } from "mongoose";
import { CustomRequest } from "../dto/request/req"; // Assuming this is the correct path
import logger from "./pdLogger";

interface DataDocument extends Document {
  name: string;
  phone_number: number;
  mobile_number: number;
  teliphone_number: number;
  work: string;
  email: string;
  created_time: string;
  updated_time: string;
}

interface Repo {
  getData: (dir: Model<DataDocument>) => Promise<DataDocument[] | undefined>;
  addData: (
    body: CustomRequest["body"],
    dir: Model<DataDocument>
  ) => Promise<{ dataAdded: string } | undefined>;
  updateData: (
    id: string,
    body: CustomRequest["body"],
    dir: Model<DataDocument>
  ) => Promise<{ update: string } | undefined>;
  deleteData: (
    id: string,
    dir: Model<DataDocument>
  ) => Promise<{ delete: string } | undefined>;
}

class SchemaRepository implements Repo {
  async getData(dir: Model<DataDocument>): Promise<DataDocument[] | undefined> {
    try {
      const data = await dir.find().exec();
      return data;
    } catch (err: any) {
      throw err;
    }
  }

  async addData(
    body: CustomRequest["body"],
    dir: Model<DataDocument>
  ): Promise<{ dataAdded: string } | undefined> {
    try {
      let now = new Date();
      const newData = new dir({
        name: body.name,
        phone_number: body.phone_number,
        mobile_number: body.mobile_number,
        teliphone_number: body.teliphone_number,
        work: body.work,
        email: body.email,
        created_time: now.toISOString(),
        updated_time: now.toISOString(),
      });
      await newData.save();
      return { dataAdded: "DONE" };
    } catch (err: any) {
      throw err;
    }
  }

  async updateData(
    id: string,
    body: CustomRequest["body"],
    dir: Model<DataDocument>
  ): Promise<{ update: string } | undefined> {
    let now = new Date();
    try {
      await dir
        .findByIdAndUpdate(id, {
          name: body.name,
          phone_number: body.phone_number,
          mobile_number: body.mobile_number,
          teliphone_number: body.teliphone_number,
          work: body.work,
          email: body.email,
          updated_time: now.toISOString(),
        })
        .exec();
      return { update: "DONE" };
    } catch (err: any) {
      throw err;
    }
  }

  async deleteData(
    id: string,
    dir: Model<DataDocument>
  ): Promise<{ delete: string } | undefined> {
    try {
      await dir.findByIdAndDelete(id).exec();
      return { delete: "DONE" };
    } catch (err: any) {
      throw err;
    }
  }
}

export default SchemaRepository;
