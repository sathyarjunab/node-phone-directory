import express from "express";

import { CustomRequest } from "../dto/request/req.ts";
import { CustomResponse } from "../dto/response/res.ts";
import Services from "../services/pdServices.ts";

let service = new Services();
let router = express.Router();

class Route {
  constructor() {
    router.get("/", this.get);
    router.post("/add", this.post);
    router.patch("/update/:id", this.patch);
    router.delete("/delete/:id", this.delete);
  }
  async get(res: any) {
    try {
      const result = await service.get();
      res.send(result);
    } catch (err: any) {
      res.send({ error: err.message });
    }
  }

  async post(req: CustomRequest, res: CustomResponse) {
    try {
      const result = await service.post(req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: (err as Error).message });
    }
  }

  async patch(req: CustomRequest, res: CustomResponse) {
    try {
      const result = await service.patch(req.params.id, req.body);
      res.send(result);
    } catch (err) {
      res.send({ error: (err as Error).message });
    }
  }

  async delete(req: CustomRequest, res: CustomResponse) {
    try {
      const result = await service.del(req.params.id);
      res.send(result);
    } catch (err) {
      res.send({ error: (err as Error).message });
    }
  }
  connect = () => {
    return router;
  };
}

export default Route;
