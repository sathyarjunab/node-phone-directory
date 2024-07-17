import { Document, Model } from "mongoose";

import { DataDocument } from "./schemas";
import { UpdateResponse } from "../dto/response/updateres";
import { PhoneEntry } from "../dto/request/createreq";
import { GetResponse } from "../dto/response/getres";
import { ManyUpdateResponse } from "../dto/response/updateres";
import { UpdateManyPhoneEntry } from "../dto/request/updatereq";
import { Response } from "../dto/response/createres";
import { UpdatePhoneEntry } from "../dto/request/updatereq";
import { ManyResponse } from "../dto/response/createres";
import { PaginationResponse } from "../dto/response/getres";

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
