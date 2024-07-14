import { GetResponse } from "./getres";

export type Response = {
  message: string;
  data: GetResponse;
};

export type ManyResponse = {
  message: string;
  data: GetResponse[];
};
