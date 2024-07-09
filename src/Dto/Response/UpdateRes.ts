// import { UpdateManyPhoneEntry as UpdatePhoneEntry } from "../Request/updateReq";
import { GetResponse } from "./getRes";

export type UpdateResponse = {
  message: string;
  data: GetResponse;
};

type BulkWriteResult = {
  insertedCount: number;
  matchedCount: number;
  modifiedCount: number;
  deletedCount: number;
  upsertedCount: number;
  upsertedIds: {};
  insertedIds: {};
};

export type manyUpdateResponse = {
  message: string;
  data: BulkWriteResult;
};
