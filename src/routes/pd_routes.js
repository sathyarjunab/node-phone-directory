import express from "express";

import services from "../services/pd_services.js";

let router = express.Router();

class Route {
  constructor() {
    router.get("/", this.get);
    router.post("/add", this.post);
    router.patch("/update/:id", this.patch);
    router.delete("/delete/:id", this.delete);
  }
  get = async (req, res) => {
    try {
      const result = await services.get(req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  };

  post = async (req, res) => {
    try {
      const result = await services.post(req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  };

  patch = async (req, res) => {
    try {
      const result = await services.patch(req.params.id, req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  };

  delete = async (req, res) => {
    try {
      const result = await services.del(req.params.id);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  };
  connect = () => {
    return router;
  };
}

let route = new Route();

export default route.connect();
