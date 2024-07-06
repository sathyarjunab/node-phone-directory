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
