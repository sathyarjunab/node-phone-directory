import repo from "../core/schemaRepository.js";

import dir from "../schemas/pd_schemas.js";

class services {
  async get() {
    return await repo.getData(dir);
  }

  async post(body) {
    return await repo.addData(body, dir);
  }

  async patch(id, body) {
    return await repo.updateData(id, body, dir);
  }

  async del(id) {
    return await repo.deleteData(id, dir);
  }
}
let service = new services();
export default service;
