import { DataDocument } from "../repository/schemas";
import { GetResponse } from "../dto/response/getres";
import { PhoneEntry } from "../dto/request/createreq";

export interface MapperInterface {
  dataFormatter: (body: DataDocument[]) => GetResponse[];
  populateDatabaseTemplate: (body: PhoneEntry[]) => DataDocument[];
}
