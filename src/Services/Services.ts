import { GetResponse } from "../Dto/Response/getRes";
import { PhoneEntry } from "../Dto/Request/createReq";
import { CreateResponse } from "../Dto/Response/createRes";
import { UpdateResponse } from "../Dto/Response/updateRes";
import { UpdateManyPhoneEntry } from "../Dto/Request/updateReq";
import { manyUpdateResponse } from "../Dto/Response/updateRes";
import { UpdatePhoneEntry } from "../Dto/Request/updateReq";
import { manyEntry } from "../Dto/Request/createReq";
import { manyResponse } from "../Dto/Response/createRes";

export interface IServices {
  get: () => Promise<GetResponse[] | undefined>;
  post: (body: PhoneEntry) => Promise<CreateResponse | undefined>;
  patch: (
    id: string,
    body: UpdatePhoneEntry
  ) => Promise<UpdateResponse | undefined>;
  del: (id: string) => Promise<{ delete: string } | undefined>;
  postMany: (body: manyEntry[]) => Promise<manyResponse | undefined>;
  patchMany: (
    body: UpdateManyPhoneEntry[]
  ) => Promise<manyUpdateResponse | undefined>;
  getbyid: (id: string) => Promise<GetResponse | undefined | null>;
  paginationget: (
    page: number,
    limit: number
  ) => Promise<GetResponse[] | undefined>;
}
