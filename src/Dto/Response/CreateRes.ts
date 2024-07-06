export type CreateResponse = {
  message: string;
  data: {
    id: string;
    name: string;
  };
};

export type manyResponse = {
  savedData: Record<string, CreateResponse>;
};
