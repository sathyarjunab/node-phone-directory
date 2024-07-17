import { DataDocument } from "../repository/schemas";
import { PhoneEntry } from "../dto/request/createreq";
class Mapper {
  dataFormatter(body: DataDocument[]) {
    let result = [];
    for (let data of body) {
      let obj = {
        _id: JSON.stringify(data._id),
        name: data.name,
        work: data.work,
        numbers: [
          { type: "phone_number", number: Number(data.numbers[0].number) },
          { type: "mobile_number", number: Number(data.numbers[1].number) },
          { type: "telephone_number", number: Number(data.numbers[2].number) },
        ],
        email: data.email,
        createdTime: data.created_time,
        updatedTime: data.updated_time,
      };
      result.push(obj);
    }
    return result;
  }

  populateDatabaseTemplate(body: PhoneEntry[]) {
    let now = new Date();
    let formate = body.map((entry) => ({
      name: entry.name,
      work: entry.work,
      numbers: [
        { type: "phone_number", number: Number(entry.phone_number) },
        { type: "mobile_number", number: Number(entry.mobile_number) },
        { type: "telephone_number", number: Number(entry.telephone_number) },
      ],
      email: entry.email,
      created_time: now,
      updated_time: now,
    }));
    return formate;
  }
}

export default Mapper;
