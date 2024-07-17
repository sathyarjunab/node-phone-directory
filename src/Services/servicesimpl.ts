import SchemaRepo from "../repository/impl/repositoryimpl";
import logger from "../core/logger";
import { dir } from "../repository/schemas";
import { GetResponse } from "../dto/response/getres";
import { Response } from "../dto/response/createres";
import { PhoneEntry } from "../dto/request/createreq";
import { UpdateResponse } from "../dto/response/updateres";
import { UpdateManyPhoneEntry } from "../dto/request/updatereq";
import { ManyUpdateResponse } from "../dto/response/updateres";
import { UpdatePhoneEntry } from "../dto/request/updatereq";
import { implePhoneBookService } from "./services";
import { ManyResponse } from "../dto/response/createres";
import { PaginationResponse } from "../dto/response/getres";

class PhoneBookService implements implePhoneBookService {
  private repo: SchemaRepo;
  constructor() {
    this.repo = new SchemaRepo();
  }
  async get(): Promise<GetResponse[] | undefined> {
    try {
      logger.info(`getting all data.`);
      let data = await this.repo.getData(dir);
      logger.info(`${data?.length} contacts are collected in total.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get info.`);
      throw err;
    }
  }

  async post(body: PhoneEntry): Promise<Response | undefined> {
    try {
      logger.info(`adding in process of name:${body.name}.`);
      let addedObject = await this.repo.addData(body, dir);
      logger.info(
        `contact added,{name:,${addedObject.data.name},_id:${addedObject.data._id}}.`
      );
      return addedObject;
    } catch (err: any) {
      logger.error(`failed to add the info of name:${body.name}.`);
      throw err;
    }
  }

  async patch(
    id: string,
    body: UpdatePhoneEntry
  ): Promise<UpdateResponse | undefined> {
    try {
      logger.info(`updating in process of _id:${id}.`);
      let updatedData = await this.repo.updateData(id, body, dir);
      logger.info(
        `successfully updated name:${updatedData?.data.name},_id:${updatedData?.data._id}.`
      );
      return updatedData;
    } catch (err: any) {
      logger.error(`failed to update info of _id:${id}.`);
      throw err;
    }
  }

  async del(id: string): Promise<{ message: string } | undefined> {
    try {
      logger.info(`deletion of ${id}`);
      let deleObj = await this.repo.deleteData(id, dir);
      logger.info(`successfully deleted ${id}.`);
      return deleObj;
    } catch (err: any) {
      logger.error(`failed to delete info of ${id}.`);
      throw err;
    }
  }
  async postMany(body: PhoneEntry[]): Promise<ManyResponse | undefined> {
    try {
      logger.info(`adding all the data`);
      let allData = await this.repo.addMany(body, dir);
      logger.info(`added all the data.`);
      return allData;
    } catch (err: any) {
      logger.error(`failed to add all the info.`);
      throw err;
    }
  }
  async patchMany(
    body: UpdateManyPhoneEntry[]
  ): Promise<ManyUpdateResponse | undefined> {
    try {
      logger.info(`updating all the info.`);
      let data = await this.repo.updateMany(body, dir);
      logger.info(`updated all the data.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to update all the info.`);
      throw err;
    }
  }

  async getByid(id: string): Promise<GetResponse | undefined | null> {
    try {
      logger.info(`getting the specific data of _id:${id}.`);
      let data = await this.repo.getById(id, dir);
      logger.info(`data successfully obtained name:${data?.name} _id:${id}.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get the info of _id:${id}.`);
      throw err;
    }
  }

  async paginationGet(
    page: string | undefined,
    limit: string | undefined
  ): Promise<PaginationResponse | undefined> {
    try {
      logger.info(`getting all the info.`);
      let data = await this.repo.paginationGet(page, limit, dir);
      logger.info(`all the data successfully obtained.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get all the info.`);
      throw err;
    }
  }
}
export default PhoneBookService;
