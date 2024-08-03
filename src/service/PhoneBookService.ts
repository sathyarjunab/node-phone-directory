import { GetResponse } from "../dto/response/CustomResponseInterfaces";
import { PhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { Res } from "../dto/response/CustomResponseInterfaces";
import { UpdateResponse } from "../dto/response/CustomResponseInterfaces";
import { UpdateManyPhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { ManyUpdateResponse } from "../dto/response/CustomResponseInterfaces";
import { UpdatePhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { ManyResponse } from "../dto/response/CustomResponseInterfaces";
import { PaginationResponse } from "../dto/response/CustomResponseInterfaces";

export interface PhoneBookService {
  getContact: () => Promise<GetResponse[]>;
  createContact: (body: PhoneEntry) => Promise<Res>;
  updateContact: (
    id: string,
    body: UpdatePhoneEntry
  ) => Promise<UpdateResponse>;
  deleteContact: (id: string) => Promise<{ message: string }>;
  postMany: (body: PhoneEntry[]) => Promise<ManyResponse>;
  patchMany: (body: UpdateManyPhoneEntry[]) => Promise<ManyUpdateResponse>;
  getByid: (id: string) => Promise<GetResponse>;
  paginationGet: (page: string, limit: string) => Promise<PaginationResponse>;
}
//method name verb
//variable and class noun
