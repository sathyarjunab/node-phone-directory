export type UpdateResponse = {
  message: string;
  data: {
    updated_id?: string;
    name?: string;
  };
};

export type manyUpdateResponse = {
  savedData: Record<string, UpdateResponse>;
};
