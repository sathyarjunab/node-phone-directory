import { Document, Model, Types } from "mongoose";

import { CreateResponse } from "../Dto/Response/createRes";
import { UpdateResponse } from "../Dto/Response/updateRes";
import { PhoneEntry } from "../Dto/Request/createReq";
import { GetResponse } from "../Dto/Response/getRes";
import { manyUpdateResponse } from "../Dto/Response/updateRes";
import { UpdateManyPhoneEntry } from "../Dto/Request/updateReq";
import { UpdatePhoneEntry } from "../Dto/Request/updateReq";
import { manyEntry } from "../Dto/Request/createReq";
import { manyResponse } from "../Dto/Response/createRes";

export type ContactInfo = {
  type: string;
  number: number;
};

export type DataDocument = Document & {
  _id: Types.ObjectId;
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: Date;
  updated_time: Date;
};

export interface Repo {
  // returnScema: (
  //   savedDataArray: UpdateResponse[] | CreateResponse[]
  // ) => Promise<manyUpdateResponse>;
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

  addMany: (
    body: manyEntry[],
    dir: Model<DataDocument>
  ) => Promise<manyResponse | undefined>;

  updateMany: (
    body: UpdateManyPhoneEntry[],
    dir: Model<DataDocument>
  ) => Promise<manyUpdateResponse | undefined>;
  getbyId: (
    id: string,
    dir: Model<DataDocument>
  ) => Promise<GetResponse | undefined | null>;
  paginationGet: (
    page: number,
    limit: number,
    dir: Model<DataDocument>
  ) => Promise<GetResponse[] | undefined>;
}
