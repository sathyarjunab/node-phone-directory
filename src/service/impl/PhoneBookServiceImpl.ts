import logger from "../../core/Logger";
import { Dir } from "../../repository/PhoneBookModel";
import { GetResponse } from "../../dto/response/CustomResponseInterfaces";
import { Res } from "../../dto/response/CustomResponseInterfaces";
import { PhoneEntry } from "../../dto/request/CustomRequestInterfaces";
import { UpdateResponse } from "../../dto/response/CustomResponseInterfaces";
import { UpdateManyPhoneEntry } from "../../dto/request/CustomRequestInterfaces";
import { ManyUpdateResponse } from "../../dto/response/CustomResponseInterfaces";
import { UpdatePhoneEntry } from "../../dto/request/CustomRequestInterfaces";
import { PhoneBookService } from "../PhoneBookService";
import { ManyResponse } from "../../dto/response/CustomResponseInterfaces";
import { PaginationResponse } from "../../dto/response/CustomResponseInterfaces";

class PhoneBookServiceImpl implements PhoneBookService {
  private dir;
  constructor() {
    this.dir = new Dir();
  }
  async getContact(): Promise<GetResponse[]> {
    try {
      logger.info(`getting all data.`);
      let data = await this.dir.getData();
      logger.info(`${data?.length} contacts are collected in total.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get info.`);
      throw err;
    }
  }

  async createContact(body: PhoneEntry): Promise<Res> {
    try {
      logger.info(`adding in process of name:${body.name}.`);
      let addedObject = await this.dir.addData(body);
      logger.info(
        `contact added,{name:,${addedObject.data.name},_id:${addedObject.data.id}}.`
      );
      return addedObject;
    } catch (err: any) {
      logger.error(`failed to add the info of name:${body.name}.`);
      throw err;
    }
  }

  async updateContact(
    id: string,
    body: UpdatePhoneEntry
  ): Promise<UpdateResponse> {
    try {
      logger.info(`updating in process of _id:${id}.`);
      let updatedData = await this.dir.updateData(id, body);
      logger.info(
        `successfully updated name:${updatedData?.data.name},_id:${updatedData?.data.id}.`
      );
      return updatedData;
    } catch (err: any) {
      logger.error(`failed to update info of _id:${id}.`);
      throw err;
    }
  }

  async deleteContact(id: string): Promise<{ message: string }> {
    try {
      logger.info(`deletion of ${id}`);
      let deleObj = await this.dir.deleteData(id);
      logger.info(`successfully deleted ${id}.`);
      return deleObj;
    } catch (err: any) {
      logger.error(`failed to delete info of ${id}.`);
      throw err;
    }
  }
  async postMany(body: PhoneEntry[]): Promise<ManyResponse> {
    try {
      logger.info(`adding all the data`);
      let allData = await this.dir.addMany(body);
      logger.info(`added all the data.`);
      return allData;
    } catch (err: any) {
      logger.error(`failed to add all the info.`);
      throw err;
    }
  }
  async patchMany(body: UpdateManyPhoneEntry[]): Promise<ManyUpdateResponse> {
    try {
      logger.info(`updating all the info.`);
      let data = await this.dir.updateMany(body);
      logger.info(`updated all the data.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to update all the info.`);
      throw err;
    }
  }

  async getByid(id: string): Promise<GetResponse> {
    try {
      logger.info(`getting the specific data of _id:${id}.`);
      let data = await this.dir.getById(id);
      logger.info(`data successfully obtained name:${data?.name} _id:${id}.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get the info of _id:${id}.`);
      throw err;
    }
  }

  async paginationGet(
    page: string,
    limit: string
  ): Promise<PaginationResponse> {
    try {
      logger.info(`getting all the info.`);
      let data = await this.dir.paginationGet(page, limit);
      logger.info(`all the data successfully obtained.`);
      return data;
    } catch (err: any) {
      logger.error(`failed to get all the info.`);
      throw err;
    }
  }
}
export default PhoneBookServiceImpl;
