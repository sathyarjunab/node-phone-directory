import express from "express";
import { Response, Request } from "express";

import logger from "../core/Logger";
import { PhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { UpdatePhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { UpdateManyPhoneEntry } from "../dto/request/CustomRequestInterfaces";
import Services from "../service/impl/PhoneBookServiceImpl";
import { CustumRequest } from "../dto/request/CustomRequestInterfaces";
import { CustumPatchRequest } from "../dto/request/CustomRequestInterfaces";

const service = new Services();
const router = express.Router();

class Route {
  constructor() {
    router.get("/", this.get);
    router.post("/add", this.post);
    router.patch("/update/:id", this.patch);
    router.delete("/delete/:id", this.delete);
    router.post("/addmany", this.postMany);
    router.patch("/updatemany", this.patchMany);
    router.get("/getbyid/:id", this.getByid);
    router.get("/paginationget", this.paginationGet);
  }
  async get(req: Request, res: Response): Promise<void> {
    //req res coustom type
    try {
      const result = await service.getContact();
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err });
    }
  }

  async post(req: CustumRequest, res: Response): Promise<void> {
    try {
      let body = req.body as PhoneEntry;
      const result = await service.createContact(body);
      res.status(201).json(result);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err });
    }
  }

  async patch(req: CustumPatchRequest, res: Response): Promise<void> {
    try {
      let body = req.body as UpdatePhoneEntry;
      let id = req.params.id as string;
      const result = await service.updateContact(id, body);
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      let id = req.params.id as string;
      const result = await service.deleteContact(id);
      res.status(200).json(result);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err });
    }
  }
  async postMany(req: Request, res: Response): Promise<void> {
    try {
      let body = req.body as PhoneEntry[];
      const data = await service.postMany(body);
      res.status(200).json(data);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ error: err });
    }
  }
  async patchMany(req: Request, res: Response): Promise<void> {
    try {
      const updateDataArray: UpdateManyPhoneEntry[] = req.body;
      const data = await service.patchMany(updateDataArray);
      res.status(200).json(data);
    } catch (err: any) {
      logger.info(err);
      res.status(500).json({ error: err });
    }
  }
  async getByid(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const data = await service.getByid(id);
      res.status(200).json(data);
    } catch (err: any) {
      logger.info(err);
      res.status(500).json({ error: err });
    }
  }
  async paginationGet(req: Request, res: Response): Promise<void> {
    try {
      let { page = 1, limit = 6 } = req.query;
      let pageString = page.toString();
      let limitString = limit.toString();
      const data = await service.paginationGet(pageString, limitString);
      res.status(200).json(data);
    } catch (err: any) {
      logger.info(err);
      res.status(500).json({ error: err });
    }
  }
  connect = () => {
    return router;
  };
}

export default Route;
