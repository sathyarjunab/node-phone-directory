import { Model } from "mongoose";

import { CreateResponse } from "../../Dto/Response/createRes";
import {
  manyUpdateResponse,
  UpdateResponse,
} from "../../Dto/Response/updateRes";
import { PhoneEntry } from "../../Dto/Request/createReq";
import { GetResponse } from "../../Dto/Response/getRes";
import {
  UpdateManyPhoneEntry,
  UpdatePhoneEntry,
} from "../../Dto/Request/updateReq";
import { DataDocument, Repo } from "../repository";
import { manyEntry } from "../../Dto/Request/createReq";
import { manyResponse } from "../../Dto/Response/createRes";

class SchemaRepository implements Repo {
  async getData(dir: Model<DataDocument>): Promise<GetResponse[] | undefined> {
    const data = await dir.find().exec();
    return data;
  }
  // async returnScema(
  //   savedDataArray: UpdateResponse[] | CreateResponse[]
  // ): Promise<manyUpdateResponse | manyResponse> {
  //   let savedData: Record<string, UpdateResponse | CreateResponse> = {};
  //   let i = 1;
  //   savedDataArray.forEach((body) => {
  //     let key = `data${i}`;
  //     savedData[key] = body;
  //     i++;
  //   });

  //   return { savedData };
  // }
  async addData(
    body: PhoneEntry,
    dir: Model<DataDocument>
  ): Promise<CreateResponse> {
    let now = new Date();
    const newData = new dir({
      name: body.name,
      work: body.work,
      numbers: [
        { type: "home", number: Number(body.phone_number) },
        { type: "mobile", number: Number(body.mobile_number) },
        { type: "work", number: Number(body.teliphone_number) },
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
  ): Promise<UpdateResponse> {
    let now = new Date();

    let updatedData = await dir
      .findByIdAndUpdate(
        id,
        {
          name: body.name,
          work: body.work,
          numbers: [
            { type: "home", number: Number(body.phone_number) },
            { type: "mobile", number: Number(body.mobile_number) },
            { type: "work", number: Number(body.teliphone_number) },
          ],
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
        name: body?.name,
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

  async addMany(
    body: manyEntry[],
    dir: Model<DataDocument>
  ): Promise<manyResponse | undefined> {
    let now = new Date();
    const savePromises = body.map(async (bodyItem) => {
      return await this.addData(bodyItem, dir);
    });
    const savedDataArray: CreateResponse[] = await Promise.all(savePromises);
    let i = 1;
    let savedData: Record<string, CreateResponse> = {};
    savedDataArray.forEach((body) => {
      let key = `data${i}`;
      savedData[key] = body;
      i++;
    });

    return { savedData };
  }
  async updateMany(
    body: UpdateManyPhoneEntry[],
    dir: Model<DataDocument>
  ): Promise<manyUpdateResponse | undefined> {
    let savePromises = body.map(async (val) => {
      let { id, ...other } = val;
      return await this.updateData(id, other, dir);
    });
    const savedDataArray: UpdateResponse[] = await Promise.all(savePromises);
    let i = 1;
    let savedData: Record<string, UpdateResponse> = {};
    savedDataArray.forEach((body) => {
      let key = `data${i}`;
      savedData[key] = body;
      i++;
    });
    return { savedData };
  }
  async getbyId(
    id: string,
    dir: Model<DataDocument>
  ): Promise<GetResponse | undefined | null> {
    const result = dir.findById(id);
    return result;
  }
  async paginationGet(
    page: number,
    limit: number,
    dir: Model<DataDocument>
  ): Promise<GetResponse[] | undefined> {
    const skip = (page - 1) * limit;
    const data = await dir.find().skip(skip).limit(limit).exec();
    return data;
  }
}
export default SchemaRepository;
