let repo = require("../core/pd_repo");

let dir = require("../schemas/pd_schemas");

let get = async () => {
  return await repo.getData(dir);
};

let post = async (body) => {
  return await repo.addData(body, dir);
};

let patch = async (id, body) => {
  return await repo.updateData(id, body, dir);
};

let del = async (id) => {
  return await repo.deleteData(id, dir);
};

module.exports = {
  get,
  post,
  patch,
  del,
};
