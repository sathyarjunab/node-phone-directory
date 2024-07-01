interface ContactInfo {
  type: string;
  numbers: number;
}
export interface GetResponse {
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: string;
  updated_time: string;
}
