import { Document, Model } from "mongoose";
import { UpdateResponse } from "../Dto/Response/updateres";
import { PhoneEntry } from "../Dto/Request/createreq";
import { GetResponse } from "../Dto/Response/getres";
import { ManyUpdateResponse } from "../Dto/Response/updateres";
import { UpdateManyPhoneEntry } from "../Dto/Request/updatereq";
import { Response } from "../Dto/Response/createres";
import { UpdatePhoneEntry } from "../Dto/Request/updatereq";
import { ManyResponse } from "../Dto/Response/createres";
import { PaginationResponse } from "../Dto/Response/getres";

export type ContactInfo = {
  type: string;
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

export interface Repo {
  getData: (dir: Model<DataDocument>) => Promise<GetResponse[] | undefined>;
  addData: (
    body: PhoneEntry,
    dir: Model<DataDocument>
  ) => Promise<Response | undefined>;
  updateData: (
    id: string,
    body: UpdatePhoneEntry,
    dir: Model<DataDocument>
  ) => Promise<UpdateResponse | undefined>;
  deleteData: (
    id: string,
    dir: Model<DataDocument>
  ) => Promise<{ message: string } | undefined>;

  addMany: (
    body: PhoneEntry[],
    dir: Model<DataDocument>
  ) => Promise<ManyResponse | undefined>;

  updateMany: (
    body: UpdateManyPhoneEntry[],
    dir: Model<DataDocument>
  ) => Promise<ManyUpdateResponse | undefined>;
  getById: (
    id: string,
    dir: Model<DataDocument>
  ) => Promise<GetResponse | undefined | null>;
  paginationGet: (
    page: string | undefined,
    limit: string | undefined,
    dir: Model<DataDocument>
  ) => Promise<PaginationResponse | undefined>;
}
