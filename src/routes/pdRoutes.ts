import express from "express";

import logger from "../core/pdLogger";
import { CustomRequest } from "../dto/request/req";
import { CustomResponse } from "../dto/response/res";
import Services from "../services/pdServices";

let service = new Services();
let router = express.Router();

class Route {
  constructor() {
    router.get("/", this.get);
    router.post("/add", this.post);
    router.patch("/update/:id", this.patch);
    router.delete("/delete/:id", this.delete);
  }
  async get(req: CustomRequest, res: CustomResponse): Promise<void> {
    try {
      const result = await service.get();
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async post(req: CustomRequest, res: CustomResponse): Promise<void> {
    try {
      const result = await service.post(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async patch(req: CustomRequest, res: CustomResponse): Promise<void> {
    try {
      const result = await service.patch(req.params.id, req.body);
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req: CustomRequest, res: CustomResponse): Promise<void> {
    try {
      const result = await service.del(req.params.id);
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }
  connect = () => {
    return router;
  };
}

export default Route;
