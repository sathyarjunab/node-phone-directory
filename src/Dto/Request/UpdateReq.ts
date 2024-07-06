export type UpdatePhoneEntry = {
  name?: string;
  work?: string;
  email?: string;
  phone_number?: number;
  mobile_number?: number;
  teliphone_number?: number;
};

export type UpdateManyPhoneEntry = UpdatePhoneEntry & {
  id: string;
};
