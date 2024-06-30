interface ContactInfo {
  type: string;
  numbers: number;
}

export interface UpdatePhoneEntry {
  name?: string;
  contacts?: ContactInfo;
  work?: string;
  email?: string;
}
