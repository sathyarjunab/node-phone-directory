import { AnyBulkWriteOperation, Model, Types } from "mongoose";
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
import { paginationresponse } from "../../Dto/Response/getRes";
import { Response } from "../../Dto/Response/createRes";
import { error } from "winston";

class SchemaRepository implements Repo {
  async getData(dir: Model<DataDocument>): Promise<GetResponse[] | undefined> {
    const data = await dir.find().exec();
    throw new Error("asfaga");
    return data;
  }
  async addData(body: PhoneEntry, dir: Model<DataDocument>): Promise<Response> {
    let now = new Date();
    const newData = new dir({
      name: body.name,
      work: body.work,
      numbers: [
        { type: "phone_number", number: Number(body.phone_number) },
        { type: "mobile_number", number: Number(body.mobile_number) },
        { type: "teliphone_number", number: Number(body.teliphone_number) },
      ],
      email: body.email,
      created_time: now.toISOString(),
      updated_time: now.toISOString(),
    });
    let SavedData = await newData.save();
    return {
      message: "dataAdded",
      data: SavedData,
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
          numbers: [
            { type: "phone_number", number: Number(body.phone_number) },
            { type: "mobile_number", number: Number(body.mobile_number) },
            { type: "teliphone_number", number: Number(body.teliphone_number) },
          ],
          email: body.email,
          updated_time: now.toISOString(),
        },
        { new: true }
      )
      .exec();
    if (updatedData) {
      return {
        message: "updated",
        data: updatedData,
      };
    } else {
      throw new Error(
        "Something went wrong during the object's search and update; undefined was the result."
      );
    }
  }

  async deleteData(
    id: string,
    dir: Model<DataDocument>
  ): Promise<{ message: string } | undefined> {
    await dir.findByIdAndDelete(id).exec();
    return { message: "Object deleted successfully" };
  }

  async addMany(
    body: manyEntry[],
    dir: Model<DataDocument>
  ): Promise<manyResponse | undefined> {
    let now = new Date();
    const savedDataArray = body.map((entry) => ({
      name: entry.name,
      work: entry.work,
      numbers: [
        { type: "phone_number", number: Number(entry.phone_number) },
        { type: "mobile_number", number: Number(entry.mobile_number) },
        { type: "teliphone_number", number: Number(entry.teliphone_number) },
      ],
      email: entry.email,
      created_time: now,
      updated_time: now,
    }));
    const savedData = await dir.insertMany(savedDataArray);
    return {
      message: "data added",
      data: savedData,
    };
  }
  async updateMany(
    body: UpdateManyPhoneEntry[],
    dir: Model<DataDocument>
  ): Promise<manyUpdateResponse | undefined> {
    const now = new Date();
    const updateOperations: AnyBulkWriteOperation<DataDocument>[] = [];

    body.forEach((update) => {
      const { id, ...updates } = update;
      const updateSet: { [key: string]: any } = {
        updated_time: now,
        ...updates,
      };

      const arrayFilters: { [key: string]: any }[] = [];
      if (updates.phone_number !== undefined) {
        updateSet["numbers.$[phoneElem].number"] = updates.phone_number;
        arrayFilters.push({ "phoneElem.type": "phone_number" });
      }
      if (updates.mobile_number !== undefined) {
        updateSet["numbers.$[mobileElem].number"] = updates.mobile_number;
        arrayFilters.push({ "mobileElem.type": "mobile_number" });
      }
      if (updates.teliphone_number !== undefined) {
        updateSet["numbers.$[teliphoneElem].number"] = updates.teliphone_number;
        arrayFilters.push({ "teliphoneElem.type": "teliphone_number" });
      }

      updateOperations.push({
        updateOne: {
          filter: { _id: id },
          update: { $set: updateSet },
          arrayFilters,
        },
      });
    });

    const result = await dir.bulkWrite(updateOperations);
    return {
      message: "data updated",
      data: result, //returning the bulkwrite result which is not the complete object we could return entire object if we want by bellow method
    };
    // or
    // const ids = body.map((update) => update.id);
    // const updatedDocs = await dir.find({ _id: { $in: ids } });

    // return {
    //   message: "data updated",
    //   data: updatedDocs,
    // };
  }
  async getbyId(
    id: string,
    dir: Model<DataDocument>
  ): Promise<GetResponse | undefined | null> {
    const result = dir.findById(id);
    return result;
  }
  async paginationGet(
    page: string | undefined,
    limit: string | undefined,
    dir: Model<DataDocument>
  ): Promise<paginationresponse | undefined> {
    let pagenum = parseInt(page as string, 10) || 1;
    let pageSize = parseInt(limit as string, 10) || 6;
    const articles = await dir.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (pagenum - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
    return {
      success: true,
      articles: {
        metadata: {
          totalCount: articles[0].metadata[0].totalCount,
          pagenum,
          pageSize,
        },
        data: articles[0].data,
      },
    };
  }
}
export default SchemaRepository;
