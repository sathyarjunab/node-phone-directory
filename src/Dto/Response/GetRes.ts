import { Types } from "mongoose";

type ContactInfo = {
  type: string;
  number: number;
};
export type GetResponse = {
  _id: Types.ObjectId;
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: Date;
  updated_time: Date;
};

type metatype = {
  metadata: {
    totalCount: number;
    pagenum: number;
    pageSize: number;
  };
  data: GetResponse[];
};

export type paginationresponse = {
  success: boolean;
  articles: metatype;
};
