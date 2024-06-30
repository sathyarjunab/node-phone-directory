import { Schema, model } from "mongoose";
// import { DataDocument } from "./DataDocument";
interface ContactInfo {
  type: string;
  numbers: number;
}
interface DataDocument extends Document {
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: string;
  updated_time: string;
}
const phoneNumberSchema = new Schema<ContactInfo>({
  type: { type: String, required: true },
  numbers: { type: Number, required: true },
});

const directorySchema = new Schema<DataDocument>({
  name: { type: String, required: true },
  numbers: { type: [phoneNumberSchema], required: true },
  work: { type: String, required: true },
  email: { type: String, required: true },
  created_time: { type: String, required: true },
  updated_time: { type: String, required: true },
});

const dir = model<DataDocument>("dir", directorySchema);

export default dir;
