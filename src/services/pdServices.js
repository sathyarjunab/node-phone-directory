import repo from "../core/schemaRepository.js";
import logger from "../core/pdLogger.js";
import dir from "../schemas/pdSchemas.js";

class services {
  async get() {
    try {
      logger.info("getting");
      return await repo.getData(dir);
    } catch (err) {
      throw err;
    }
  }

  async post(body) {
    try {
      logger.info("adding");
      return await repo.addData(body, dir);
    } catch (err) {
      throw err;
    }
  }

  async patch(id, body) {
    try {
      logger.info("updating");
      return await repo.updateData(id, body, dir);
    } catch (err) {
      throw err;
    }
  }

  async del(id) {
    try {
      logger.info("deleting");
      return await repo.deleteData(id, dir);
    } catch (err) {
      throw err;
    }
  }
}
export default services;

// connection ***
// file names ***
// multiple phone number email ***
// test in js file
// try catch in service ***
// add loggers in service
// created date and updated date ***
