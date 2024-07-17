type ContactInfo = {
  type: string;
  number: number;
};
export type GetResponse = {
  _id: string;
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  createdTime: Date;
  updatedTime: Date;
};

type MetaType = {
  metaData: {
    totalCount: number;
    pageNum: number;
    pageSize: number;
  };
  data: GetResponse[];
};

export type PaginationResponse = {
  success: boolean;
  articles: MetaType;
};
