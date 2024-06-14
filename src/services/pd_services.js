import repo from "../core/pd_repo.js";

import dir from "../schemas/pd_schemas.js";

class services {
  constructor() {
    this.getData = repo.getData;
    this.addData = repo.addData;
    this.updateData = repo.updateData;
    this.deleteData = repo.deleteData;
  }
  get = async () => {
    return await this.getData(dir);
  };

  post = async (body) => {
    return await this.addData(body, dir);
  };

  patch = async (id, body) => {
    return await this.updateData(id, body, dir);
  };

  del = async (id) => {
    return await this.deleteData(id, dir);
  };
}
let service = new services();
export default service;
