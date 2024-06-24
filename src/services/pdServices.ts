import schemarepo from "../core/schemaRepository";
import logger from "../core/pdLogger";
import dir from "../schemas/pdSchemas";
import { CustomRequest } from "../dto/request/req";
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

  async post(body: CustomRequest["body"]): Promise<any> {
    try {
      logger.info("adding");
      return await repo.addData(body, dir);
    } catch (err: any) {
      throw err;
    }
  }

  async patch(id: string, body: CustomRequest["body"]): Promise<any> {
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
