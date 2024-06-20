import schemarepo from "../core/schemaRepository";
import logger from "../core/pdLogger";
import dir from "../schemas/pdSchemas";

let repo = new schemarepo();

class Services {
  async get(): Promise<any> {
    try {
      logger.info("getting");
      return await repo.getData(dir);
    } catch (err) {
      throw err;
    }
  }

  async post(body: any): Promise<any> {
    try {
      logger.info("adding");
      return await repo.addData(body, dir);
    } catch (err) {
      throw err;
    }
  }

  async patch(id: string, body: any): Promise<any> {
    try {
      logger.info("updating");
      return await repo.updateData(id, body, dir);
    } catch (err) {
      throw err;
    }
  }

  async del(id: string): Promise<any> {
    try {
      logger.info("deleting");
      return await repo.deleteData(id, dir);
    } catch (err) {
      throw err;
    }
  }
}

export default Services;
