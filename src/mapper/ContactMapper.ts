import { DataDocument } from "../repository/PhoneBookModel";
import { PhoneEntry } from "../dto/request/CustomRequestInterfaces";
import { GetResponse } from "../dto/response/CustomResponseInterfaces";
type ContactInfo = {
  type: string;
  number: number;
};

type d = {
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: Date;
  updated_time: Date;
};
//function which modify the output of mongoose id to string
class ContactMapper {
  toContact(body: DataDocument[]): GetResponse[] {
    let result: GetResponse[] = [];
    for (let data of body) {
      let obj = {
        id: JSON.stringify(data._id),
        name: data.name,
        work: data.work,
        numbers: [...data.numbers],
        email: data.email,
        createdTime: data.created_time,
        updatedTime: data.updated_time,
      };
      result.push(obj);
    }
    return result;
  }

  //function which returns object.which can be used as input for mongoose object such as adding data , updating data
  toSchema(body: PhoneEntry[]): d[] {
    let now = new Date();
    let formate: d[] = [];
    for (let entry of body) {
      let obj: d = {
        name: entry.name,
        work: entry.work,
        numbers: [...entry.numbers],
        email: entry.email,
        created_time: now,
        updated_time: now,
      };
      formate.push(obj);
    }

    return formate;
  }
}

export default ContactMapper;
