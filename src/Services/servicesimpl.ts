import SchemaRepo from "../Repository/Impl/repositoryimpl";
import logger from "../Core/logger";
import dir from "../Repository/schemas";
import { GetResponse } from "../Dto/Response/getres";
import { Response } from "../Dto/Response/createres";
import { PhoneEntry } from "../Dto/Request/createreq";
import { UpdateResponse } from "../Dto/Response/updateres";
import { UpdateManyPhoneEntry } from "../Dto/Request/updatereq";
import { ManyUpdateResponse } from "../Dto/Response/updateres";
import { UpdatePhoneEntry } from "../Dto/Request/updatereq";
import { implePhoneBookService } from "./services";
import { ManyResponse } from "../Dto/Response/createres";
import { PaginationResponse } from "../Dto/Response/getres";

class phoneBookService implements implePhoneBookService {
  private repo: SchemaRepo;
  constructor() {
    this.repo = new SchemaRepo();
  }
  async get(reqid: string): Promise<GetResponse[] | undefined> {
    try {
      logger.info(`getting all data. ${reqid}`);
      let data = await this.repo.getData(dir);
      logger.info(`${data?.length} contacts are collected in total. ${reqid}`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get info ${reqid}`);
      throw err;
    }
  }

  async post(body: PhoneEntry, reqid: string): Promise<Response | undefined> {
    try {
      logger.info(`adding in process ${reqid}`);
      let addedObject = await this.repo.addData(body, dir);
      logger.info(`contact added ${reqid}`);
      return addedObject;
    } catch (err: any) {
      logger.error(`failed to add the info ${reqid}`);
      throw err;
    }
  }

  async patch(
    id: string,
    body: UpdatePhoneEntry,
    reqid: string
  ): Promise<UpdateResponse | undefined> {
    try {
      logger.info(`updating in process ${reqid}`);
      let updatedData = await this.repo.updateData(id, body, dir);
      logger.info(`successfully updated ${reqid}`);
      return updatedData;
    } catch (err: any) {
      logger.error(`failed to update info ${reqid}`);
      throw err;
    }
  }

  async del(
    id: string,
    reqid: string
  ): Promise<{ message: string } | undefined> {
    try {
      logger.info(`deleting ${reqid}`);
      let deleObj = await this.repo.deleteData(id, dir);
      logger.info(`successfully deleted ${reqid}`);
      return deleObj;
    } catch (err: any) {
      logger.error(`failed to delete info ${reqid}`);
      throw err;
    }
  }
  async postMany(
    body: PhoneEntry[],
    reqid: string
  ): Promise<ManyResponse | undefined> {
    try {
      logger.info(`adding all the data ${reqid}`);
      let allData = await this.repo.addMany(body, dir);
      logger.info(`added all the data ${reqid}`);
      return allData;
    } catch (err: any) {
      logger.error(`failed to add all the info ${reqid}`);
      throw err;
    }
  }
  async patchMany(
    body: UpdateManyPhoneEntry[],
    reqid: string
  ): Promise<ManyUpdateResponse | undefined> {
    try {
      logger.info(`updating all the info ${reqid}`);
      let data = await this.repo.updateMany(body, dir);
      logger.info(`updated all the data ${reqid}`);
      return data;
    } catch (err: any) {
      logger.error(`failed to update all the info ${reqid}`);
      throw err;
    }
  }

  async getByid(
    id: string,
    reqid: string
  ): Promise<GetResponse | undefined | null> {
    try {
      logger.info(`getting the specific data ${reqid}`);
      let data = await this.repo.getById(id, dir);
      logger.info(`data successfully obtained ${reqid}`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get the info ${reqid}`);
      throw err;
    }
  }

  async paginationGet(
    page: string | undefined,
    limit: string | undefined,
    reqid: string
  ): Promise<PaginationResponse | undefined> {
    try {
      logger.info(`getting all the info ${reqid}`);
      let data = await this.repo.paginationGet(page, limit, dir);
      logger.info(`all the data successfully obtained ${reqid}`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get all the info ${reqid}`);
      throw err;
    }
  }
}
export default phoneBookService;
