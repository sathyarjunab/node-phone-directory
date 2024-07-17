import { AnyBulkWriteOperation, Model, Document } from "mongoose";

import { DataDocument } from "../schemas";
import {
  ManyUpdateResponse,
  UpdateResponse,
} from "../../dto/response/updateres";
import { PhoneEntry } from "../../dto/request/createreq";
import { GetResponse } from "../../dto/response/getres";
import {
  UpdateManyPhoneEntry,
  UpdatePhoneEntry,
} from "../../dto/request/updatereq";
import { Repo } from "../repository";
import { ManyResponse } from "../../dto/response/createres";
import { PaginationResponse } from "../../dto/response/getres";
import { Response } from "../../dto/response/createres";
import Mapper from "../../mapper/maperimpl";

class SchemaRepository implements Repo {
  private map;
  constructor() {
    this.map = new Mapper();
  }
  async getData(dir: Model<DataDocument>): Promise<GetResponse[] | undefined> {
    const data = await dir.find().exec();
    let toGetData = this.map.dataFormatter(data);
    return toGetData;
  }
  async addData(body: PhoneEntry, dir: Model<DataDocument>): Promise<Response> {
    let formate = [body];
    let obj = this.map.populateDatabaseTemplate(formate)[0];
    const newData = new dir(obj);
    let savedData = await newData.save();
    let modifiedResult = this.map.dataFormatter([savedData])[0];
    return {
      message: "Data added",
      data: modifiedResult,
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
            { type: "telephone_number", number: Number(body.telephone_number) },
          ],
          email: body.email,
          updated_time: now.toISOString(),
        },
        { new: true }
      )
      .exec();
    if (updatedData) {
      let modifiedResult = this.map.dataFormatter([updatedData])[0];
      return {
        message: "updated",
        data: modifiedResult,
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
    body: PhoneEntry[],
    dir: Model<DataDocument>
  ): Promise<ManyResponse | undefined> {
    let now = new Date();
    const savedDataArray = this.map.populateDatabaseTemplate(body);
    const savedData = await dir.insertMany(savedDataArray);
    let modifiedResult = this.map.dataFormatter(savedData);
    return {
      message: "data added",
      data: modifiedResult,
    };
  }
  async updateMany(
    body: UpdateManyPhoneEntry[],
    dir: Model<DataDocument>
  ): Promise<ManyUpdateResponse | undefined> {
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
      if (updates.telephone_number !== undefined) {
        updateSet["numbers.$[teliphoneElem].number"] = updates.telephone_number;
        arrayFilters.push({ "telephoneElem.type": "telephone_number" });
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
    // const objectIds = body.map((update) => update.id);
    // const updatedDocs = await dir.find({ _id: { $in: objectIds } });

    // return {
    //   message: "data updated",
    //   data: updatedDocs,
    // };
  }
  async getById(
    id: string,
    dir: Model<DataDocument>
  ): Promise<GetResponse | undefined | null> {
    const result = await dir.findById(id);
    if (result) {
      let modifiedResult = this.map.dataFormatter([result])[0];
      return modifiedResult;
    }
  }
  async paginationGet(
    page: string | undefined,
    limit: string | undefined,
    dir: Model<DataDocument>
  ): Promise<PaginationResponse | undefined> {
    let pageNum = parseInt(page as string, 10) || 1;
    let pageSize = parseInt(limit as string, 10) || 6;
    const articles = await dir.aggregate([
      {
        $facet: {
          metaData: [{ $count: "totalCount" }],
          data: [{ $skip: (pageNum - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
    let modifiedResult = this.map.dataFormatter(articles[0].data);
    return {
      success: true,
      articles: {
        metaData: {
          totalCount: articles[0].metaData[0].totalCount,
          pageNum,
          pageSize,
        },
        data: modifiedResult,
      },
    };
  }
}
export default SchemaRepository;
