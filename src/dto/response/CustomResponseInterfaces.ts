import { Response } from "express";

enum numberTypes {
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  telephoneNumber = "telephoneNumber",
}
type ContactInfo = {
  type: numberTypes;
  number: number;
};
export type GetResponse = {
  id: string;
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  createdTime: Date;
  updatedTime: Date;
};

type pageInfo = {
  totalCount: number;
  pageNum: number;
  pageSize: number;
};

export type PaginationResponse = {
  metaData: pageInfo;
  data: GetResponse[];
};

export type Res = {
  message: string;
  data: GetResponse;
};

export type ManyResponse = {
  message: string;
  data: GetResponse[];
};

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
