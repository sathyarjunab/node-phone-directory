import schemarepo from "../repository/impl/repositoryimpl";
import logger from "../Core/logger";
import dir from "../repository/schemas";
import { GetResponse } from "../Dto/Response/getRes";
import { PhoneEntry } from "../Dto/Request/createReq";
import { CreateResponse } from "../Dto/Response/createRes";
import { UpdateResponse } from "../Dto/Response/updateRes";
import { UpdateManyPhoneEntry } from "../Dto/Request/updateReq";
import { manyUpdateResponse } from "../Dto/Response/updateRes";
import { UpdatePhoneEntry } from "../Dto/Request/updateReq";
import { IServices } from "./services";
import { manyEntry } from "../Dto/Request/createReq";
import { manyResponse } from "../Dto/Response/createRes";

class Services implements IServices {
  private repo: schemarepo;
  constructor() {
    this.repo = new schemarepo();
  }
  async get(): Promise<GetResponse[] | undefined> {
    try {
      logger.info("getting the data");
      let data = await this.repo.getData(dir);
      logger.info("data gathered");
      return data;
    } catch (err: any) {
      logger.error("failed to get info");
      throw err;
    }
  }

  async post(body: PhoneEntry): Promise<CreateResponse | undefined> {
    try {
      logger.info("adding in process");
      let addedobject = await this.repo.addData(body, dir);
      logger.info("contact added");
      return addedobject;
    } catch (err: any) {
      logger.error("failed to add the info");
      throw err;
    }
  }

  async patch(
    id: string,
    body: UpdatePhoneEntry
  ): Promise<UpdateResponse | undefined> {
    try {
      logger.info("updating in process");
      let updatedData = await this.repo.updateData(id, body, dir);
      logger.info("successfully updated");
      return updatedData;
    } catch (err: any) {
      logger.error("failed to update info");
      throw err;
    }
  }

  async del(id: string): Promise<{ delete: string } | undefined> {
    try {
      logger.info("deleting");
      let deleobj = await this.repo.deleteData(id, dir);
      logger.info("successfully deleted");
      return deleobj;
    } catch (err: any) {
      logger.error("failed to delete info");
      throw err;
    }
  }
  async postMany(body: manyEntry[]): Promise<manyResponse | undefined> {
    try {
      logger.info("adding all the data");
      let alldata = await this.repo.addMany(body, dir);
      logger.info("added all the data");
      return alldata;
    } catch (err: any) {
      logger.error("failed to add all the info");
      throw err;
    }
  }
  async patchMany(
    body: UpdateManyPhoneEntry[]
  ): Promise<manyUpdateResponse | undefined> {
    try {
      logger.info("updating all the info");
      let data = await this.repo.updateMany(body, dir);
      logger.info("updated all the data");
      return data;
    } catch (err: any) {
      logger.error("failed to update all the info");
      throw err;
    }
  }

  async getbyid(id: string): Promise<GetResponse | undefined | null> {
    try {
      logger.info("getting the specific data");
      let data = await this.repo.getbyId(id, dir);
      logger.info("data successfully obtained");
      return data;
    } catch (err: any) {
      logger.error("failed to get the info");
      throw err;
    }
  }

  async paginationget(
    page: number,
    limit: number
  ): Promise<GetResponse[] | undefined> {
    try {
      logger.info("getting all the info");
      let data = await this.repo.paginationGet(page, limit, dir);
      logger.info("all the data successfully obtained");
      return data;
    } catch (err: any) {
      logger.error("failed to get all the info");
      throw err;
    }
  }
}
export default Services;
