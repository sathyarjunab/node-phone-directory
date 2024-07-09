import express from "express";
import { Response, Request } from "express";

import logger from "../Core/logger";
import { PhoneEntry } from "../Dto/Request/createReq";
import { UpdatePhoneEntry } from "../Dto/Request/updateReq";
import { UpdateManyPhoneEntry } from "../Dto/Request/updateReq";
import Services from "../Services/servicesimpl";

let service = new Services();
let router = express.Router();

class Route {
  constructor() {
    router.get("/", this.get);
    router.post("/add", this.post);
    router.patch("/update/:id", this.patch);
    router.delete("/delete/:id", this.delete);
    router.post("/addmany", this.postMany);
    router.patch("/updatemany", this.patchMany);
    router.get("/getbyid/:id", this.getbyid);
    router.get("/paginationget", this.paginationget);
  }
  async get(req: Request, res: Response): Promise<void> {
    try {
      const result = await service.get();
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    try {
      let body = req.body as PhoneEntry;
      const result = await service.post(body);
      res.status(201).json(result);
    } catch (err: any) {
      logger.error(err);
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
      logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      let id = req.params.id as string;
      const result = await service.del(id);
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }
  async postMany(req: Request, res: Response): Promise<void> {
    try {
      let body = req.body as PhoneEntry[];
      const data = await service.postMany(body);
      res.status(200).json(data);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err.message });
    }
  }
  async patchMany(req: Request, res: Response): Promise<void> {
    try {
      const updateDataArray: UpdateManyPhoneEntry[] = req.body;
      const data = await service.patchMany(updateDataArray);
      res.status(200).json(data);
    } catch (err: any) {
      logger.info(err);
      res.status(500).json({ error: err.message });
    }
  }
  async getbyid(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const data = await service.getbyid(id);
      res.status(200).json(data);
    } catch (err: any) {
      logger.info(err);
      res.status(500).json({ error: err.message });
    }
  }
  async paginationget(req: Request, res: Response): Promise<void> {
    try {
      let { page, limit } = req.query;
      let pagestr = page?.toString();
      let limitst = limit?.toString();
      const data = await service.paginationget(pagestr, limitst);
      res.status(200).json(data);
    } catch (err: any) {
      logger.info(err);
      res.status(500).json({ error: err.message });
    }
  }
  connect = () => {
    return router;
  };
}

export default Route;
