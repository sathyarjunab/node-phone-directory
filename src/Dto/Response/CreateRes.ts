import { GetResponse } from "./getRes";

export type Response = {
  message: string;
  data: GetResponse;
};

export type manyResponse = {
  message: string;
  data: GetResponse[];
};
