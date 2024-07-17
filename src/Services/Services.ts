import { GetResponse } from "../dto/response/getres";
import { PhoneEntry } from "../dto/request/createreq";
import { Response } from "../dto/response/createres";
import { UpdateResponse } from "../dto/response/updateres";
import { UpdateManyPhoneEntry } from "../dto/request/updatereq";
import { ManyUpdateResponse } from "../dto/response/updateres";
import { UpdatePhoneEntry } from "../dto/request/updatereq";
import { ManyResponse } from "../dto/response/createres";
import { PaginationResponse } from "../dto/response/getres";

export interface implePhoneBookService {
  get: () => Promise<GetResponse[] | undefined>;
  post: (body: PhoneEntry) => Promise<Response | undefined>;
  patch: (
    id: string,
    body: UpdatePhoneEntry
  ) => Promise<UpdateResponse | undefined>;
  del: (id: string) => Promise<{ message: string } | undefined>;
  postMany: (body: PhoneEntry[]) => Promise<ManyResponse | undefined>;
  patchMany: (
    body: UpdateManyPhoneEntry[]
  ) => Promise<ManyUpdateResponse | undefined>;
  getByid: (id: string) => Promise<GetResponse | undefined | null>;
  paginationGet: (
    page: string | undefined,
    limit: string | undefined
  ) => Promise<PaginationResponse | undefined>;
}
