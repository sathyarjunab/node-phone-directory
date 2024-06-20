import { Request } from "express";

export interface CustomRequest extends Request {
  body: {
    name: string;
    phone_number: number;
    mobile_number: number;
    teliphone_number: number;
    work: string;
    email: string;
    created_time: string;
    updated_time: string;
  };
}
