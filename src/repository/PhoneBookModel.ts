import { AnyBulkWriteOperation, models, Types } from "mongoose";

import { UpdateResponse } from "../dto/response/CustomResponseInterfaces";
import { PhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { GetResponse } from "../dto/response/CustomResponseInterfaces";
import { ManyUpdateResponse } from "../dto/response/CustomResponseInterfaces";
import { UpdateManyPhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { Res } from "../dto/response/CustomResponseInterfaces";
import { UpdatePhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { ManyResponse } from "../dto/response/CustomResponseInterfaces";
import { PaginationResponse } from "../dto/response/CustomResponseInterfaces";
import { Document, Schema, model } from "mongoose";
import Mapper from "../mapper/ContactMapper";
let map = new Mapper();
enum numberTypes {
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  telephoneNumber = "telephoneNumber",
}
type ContactInfo = {
  type: numberTypes;
  number: number;
};
export type DataDocument = Document & {
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: Date;
  updated_time: Date;
};

export interface Repository extends DataDocument {
  getData(): Promise<GetResponse[]>;
  addData(body: PhoneEntry): Promise<Res>;
  updateData(id: string, body: UpdatePhoneEntry): Promise<UpdateResponse>;
  deleteData(id: string): Promise<{ message: string }>;

  addMany(body: PhoneEntry[]): Promise<ManyResponse>;

  updateMany(body: UpdateManyPhoneEntry[]): Promise<ManyUpdateResponse>;
  getById(id: string): Promise<GetResponse>;
  paginationGet(page: string, limit: string): Promise<PaginationResponse>;
}

const PhoneNumberSchema = new Schema<ContactInfo>({
  type: { type: String, required: true },
  number: { type: Number, required: true },
});

const DirectorySchema: Schema<Repository> = new Schema({
  name: { type: String, required: true },
  numbers: { type: [PhoneNumberSchema], required: true },
  work: { type: String, required: true },
  email: { type: String, required: true },
  created_time: { type: Date, required: true },
  updated_time: { type: Date, required: true },
});

DirectorySchema.methods.getData = async function (): Promise<GetResponse[]> {
  const data = await this.model("dir").find().exec();
  let toGetData = map.toContact(data);
  return toGetData;
};

DirectorySchema.methods.addData = async function (
  body: PhoneEntry
): Promise<Res> {
  let formate = [body];
  this.obj = map.toSchema(formate)[0];
  let savedData = await this.save();
  let modifiedResult = map.toContact([savedData])[0];
  return {
    message: "Data added",
    data: modifiedResult,
  };
};

DirectorySchema.methods.updateData = async function (
  id: string,
  body: UpdatePhoneEntry
): Promise<UpdateResponse> {
  let now = new Date();

  let updatedData = await this.findByIdAndUpdate(
    id,
    {
      name: body.name,
      work: body.work,
      numbers: body.numbers,
      email: body.email,
      updated_time: now.toISOString(),
    },
    { new: true }
  ).exec();
  let modifiedResult = map.toContact([updatedData])[0];
  return {
    message: "updated",
    data: modifiedResult,
  };
};

DirectorySchema.methods.deleteData = async function (
  id: string
): Promise<{ message: string }> {
  await this.findByIdAndDelete(id).exec();
  return { message: "Object deleted successfully" };
};

DirectorySchema.methods.addMany = async function (
  body: PhoneEntry[]
): Promise<ManyResponse> {
  const savedDataArray = map.toSchema(body);
  const savedData = await this.insertMany(savedDataArray);
  let modifiedResult = map.toContact(savedData);
  return {
    message: "data added",
    data: modifiedResult,
  };
};

// DirectorySchema.methods.updateMany = async function (
//   body: UpdateManyPhoneEntry[]
// ): Promise<Res> {
// const now = new Date();
// const updateOperations: AnyBulkWriteOperation<DataDocument>[] = [];

// body.forEach((update) => {
//   const { id, numbers, ...updates } = update;

//   const updateSet: { [key: string]: any } = {
//     updated_time: now,
//     ...updates,
//   };

//   const arrayFilters: { [key: string]: any }[] = [];
//   if (updates.phone_number !== undefined) {
//     updateSet["numbers.$[phoneElem].number"] = updates.phone_number;
//     arrayFilters.push({ "phoneElem.type": "phone_number" });
//   }
//   if (updates.mobile_number !== undefined) {
//     updateSet["numbers.$[mobileElem].number"] = updates.mobile_number;
//     arrayFilters.push({ "mobileElem.type": "mobile_number" });
//   }
//   if (updates.telephone_number !== undefined) {
//     updateSet["numbers.$[telephoneElem].number"] = updates.telephone_number;
//     arrayFilters.push({ "telephoneElem.type": "telephone_number" });
//   }

//   updateOperations.push({
//     updateOne: {
//       filter: { _id: id },
//       update: { $set: updateSet },
//       arrayFilters,
//     },
//   });
// });

// const result = await this.bulkWrite(updateOperations);
// return {
//   message: "data updated",
//   data: result,
// };

DirectorySchema.methods.getById = async function (
  id: string
): Promise<GetResponse> {
  const result = await this.findById(id);
  let modifiedResult = map.toContact([result])[0];
  return modifiedResult;
};

DirectorySchema.methods.paginationGet = async function (
  page: string,
  limit: string
): Promise<PaginationResponse> {
  let pageNum = parseInt(page as string, 10);
  let pageSize = parseInt(limit as string, 10);
  const articles = await this.aggregate([
    {
      $facet: {
        metaData: [{ $count: "totalCount" }],
        data: [{ $skip: (pageNum - 1) * pageSize }, { $limit: pageSize }],
      },
    },
  ]);
  let modifiedResult = map.toContact(articles[0].data);
  return {
    metaData: {
      totalCount: articles[0].metaData[0].totalCount,
      pageNum,
      pageSize,
    },
    data: modifiedResult,
  };
};
// export default models.Dir || model<Repository>("Dir", DirectorySchema);
export const Dir = model<Repository>("dir", DirectorySchema);
