import { Request } from "express";

enum NumberTypes {
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  telephoneNumber = "telephoneNumber",
}

type UserNumbers = {
  type: NumberTypes;
  number: number;
};
export type PhoneEntry = {
  name: string;
  work: string;
  email: string;
  numbers: UserNumbers[];
};

export type UpdatePhoneEntry = {
  name?: string;
  work?: string;
  email?: string;
  numbers?: UserNumbers[];
};

export type UpdateManyPhoneEntry = UpdatePhoneEntry & {
  id: string;
};

export type CustumPatchRequest = Request & {
  body: UpdatePhoneEntry;
};

export type CustumRequest = Request & {
  body: PhoneEntry;
};

export type CustumPostManyRequest = Request & {
  body: PhoneEntry[];
};
