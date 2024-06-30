interface ContactInfo {
  type: string;
  numbers: number;
}

export interface PhoneEntry {
  name: string;
  contacts: ContactInfo[];
  work: string;
  email: string;
  phone_number: number;
  mobile_number: number;
  teliphone_number: number;
}
