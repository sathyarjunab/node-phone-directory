import express from "express";
import { Response, Request } from "express";

import logger from "../Core/Logger";
import { PhoneEntry } from "../Dto/Request/CreateReq";
import { UpdatePhoneEntry } from "../Dto/Request/UpdateReq";
import Services from "../Services/Services";

let service = new Services();
let router = express.Router();

class Route {
  constructor() {
    router.get("/", this.get);
    router.post("/add", this.post);
    router.patch("/update/:id", this.patch);
    router.delete("/delete/:id", this.delete);
  }
  async get(req: Request, res: Response): Promise<void> {
    try {
      const result = await service.get();
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    try {
      let body = req.body as PhoneEntry;
      const result = await service.post(body);
      res.status(201).json(result);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async patch(req: Request, res: Response): Promise<void> {
    try {
      let body = req.body as UpdatePhoneEntry;
      let id = req.params.id as string;
      const result = await service.patch(id, body);
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      let id = req.params.id as string;
      const result = await service.del(id);
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
