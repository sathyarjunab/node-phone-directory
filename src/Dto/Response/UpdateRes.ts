import { GetResponse } from "./getres";

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

export type ManyUpdateResponse = {
  message: string;
  data: BulkWriteResult;
};
