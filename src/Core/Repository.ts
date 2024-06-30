import { Model } from "mongoose";

import { CreateResponse } from "../Dto/Response/CreateRes";
import { UpdateResponse } from "../Dto/Response/UpdateRes";
import { PhoneEntry } from "../Dto/Request/CreateReq";
import { GetResponse } from "../Dto/Response/GetRes";
import { UpdatePhoneEntry } from "../Dto/Request/UpdateReq";

export interface ContactInfo {
  type: string;
  numbers: number;
}

export interface DataDocument extends Document {
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: string;
  updated_time: string;
}

export interface Repo {
  getData: (dir: Model<DataDocument>) => Promise<GetResponse[] | undefined>;
  addData: (
    body: PhoneEntry,
    dir: Model<DataDocument>
  ) => Promise<CreateResponse | undefined>;
  updateData: (
    id: string,
    body: UpdatePhoneEntry,
    dir: Model<DataDocument>
  ) => Promise<UpdateResponse | undefined>;
  deleteData: (
    id: string,
    dir: Model<DataDocument>
  ) => Promise<{ delete: string } | undefined>;
}
