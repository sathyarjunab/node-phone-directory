import { Model } from "mongoose";

import { CreateResponse } from "../Dto/Response/CreateRes";
import { UpdateResponse } from "../Dto/Response/UpdateRes";
import { PhoneEntry } from "../Dto/Request/CreateReq";
import { GetResponse } from "../Dto/Response/GetRes";
import { UpdatePhoneEntry } from "../Dto/Request/UpdateReq";
import { DataDocument, Repo } from "../Core/Repository";

class SchemaRepository implements Repo {
  async getData(dir: Model<DataDocument>): Promise<GetResponse[] | undefined> {
    const data = await dir.find().exec();
    return data;
  }

  async addData(
    body: PhoneEntry,
    dir: Model<DataDocument>
  ): Promise<CreateResponse | undefined> {
    let now = new Date();
    const newData = new dir({
      name: body.name,
      work: body.work,
      numbers: [
        { type: "home", numbers: Number(body.phone_number) },
        { type: "mobile", numbers: Number(body.mobile_number) },
        { type: "work", numbers: Number(body.teliphone_number) },
      ],
      email: body.email,
      created_time: now.toISOString(),
      updated_time: now.toISOString(),
    });
    let SavedData = await newData.save();
    return {
      message: "dataAdded",
      data: {
        id: SavedData._id.toString(),
        name: body.name,
      },
    };
  }

  async updateData(
    id: string,
    body: UpdatePhoneEntry,
    dir: Model<DataDocument>
  ): Promise<UpdateResponse | undefined> {
    let now = new Date();

    let updatedData = await dir
      .findByIdAndUpdate(
        id,
        {
          name: body.name,
          work: body.work,
          email: body.email,
          updated_time: now.toISOString(),
        },
        { new: true }
      )
      .exec();
    return {
      message: "updated",
      data: {
        updated_id: updatedData?._id.toString(),
        name: body.name,
      },
    };
  }

  async deleteData(
    id: string,
    dir: Model<DataDocument>
  ): Promise<{ delete: string } | undefined> {
    await dir.findByIdAndDelete(id).exec();
    return { delete: "DONE" };
  }
}

export default SchemaRepository;
