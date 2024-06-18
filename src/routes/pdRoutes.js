import express from "express";

import services from "../services/pdServices.js";

let router = express.Router();
let service = new services();

class Route {
  constructor() {
    router.get("/", this.get);
    router.post("/add", this.post);
    router.patch("/update/:id", this.patch);
    router.delete("/delete/:id", this.delete);
  }
  async get(req, res) {
    try {
      const result = await service.get(req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  }

  async post(req, res) {
    try {
      const result = await service.post(req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  }

  async patch(req, res) {
    try {
      const result = await service.patch(req.params.id, req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await service.del(req.params.id);
      res.send(result);
    } catch (err) {
      res.send({ error: err.message });
    }
  }
  connect = () => {
    return router;
  };
}

let route = new Route();

export default route.connect();
