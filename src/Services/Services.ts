import { GetResponse } from "../Dto/Response/getres";
import { PhoneEntry } from "../Dto/Request/createreq";
import { Response } from "../Dto/Response/createres";
import { UpdateResponse } from "../Dto/Response/updateres";
import { UpdateManyPhoneEntry } from "../Dto/Request/updatereq";
import { ManyUpdateResponse } from "../Dto/Response/updateres";
import { UpdatePhoneEntry } from "../Dto/Request/updatereq";
import { ManyResponse } from "../Dto/Response/createres";
import { PaginationResponse } from "../Dto/Response/getres";

export interface implePhoneBookService {
  get: (reqid: string) => Promise<GetResponse[] | undefined>;
  post: (body: PhoneEntry, reqid: string) => Promise<Response | undefined>;
  patch: (
    id: string,
    body: UpdatePhoneEntry,
    reqid: string
  ) => Promise<UpdateResponse | undefined>;
  del: (id: string, reqid: string) => Promise<{ message: string } | undefined>;
  postMany: (
    body: PhoneEntry[],
    reqid: string
  ) => Promise<ManyResponse | undefined>;
  patchMany: (
    body: UpdateManyPhoneEntry[],
    reqid: string
  ) => Promise<ManyUpdateResponse | undefined>;
  getByid: (
    id: string,
    reqid: string
  ) => Promise<GetResponse | undefined | null>;
  paginationGet: (
    page: string | undefined,
    limit: string | undefined,
    reqid: string
  ) => Promise<PaginationResponse | undefined>;
}
