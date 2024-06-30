import schemarepo from "../Core/Repositoryimpl";
import logger from "../Core/Logger";
import dir from "../Schemas/Schemas";
import { PhoneEntry } from "../Dto/Request/CreateReq";
import { UpdatePhoneEntry } from "../Dto/Request/UpdateReq";
let repo = new schemarepo();

class Services {
  async get(): Promise<any> {
    try {
      logger.info("getting");
      return await repo.getData(dir);
    } catch (err: any) {
      throw err;
    }
  }

  async post(body: PhoneEntry): Promise<any> {
    try {
      logger.info("adding");
      return await repo.addData(body, dir);
    } catch (err: any) {
      throw err;
    }
  }

  async patch(id: string, body: UpdatePhoneEntry): Promise<any> {
    try {
      logger.info("updating");
      return await repo.updateData(id, body, dir);
    } catch (err: any) {
      throw err;
    }
  }

  async del(id: string): Promise<any> {
    try {
      logger.info("deleting");
      return await repo.deleteData(id, dir);
    } catch (err: any) {
      throw err;
    }
  }
}

export default Services;
