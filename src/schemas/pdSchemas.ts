import { Schema, model } from "mongoose";
// import { DataDocument } from "./DataDocument";
interface DataDocument extends Document {
  name: string;
  phone_number: number;
  mobile_number: number;
  teliphone_number: number;
  work: string;
  email: string;
  created_time: string;
  updated_time: string;
}
const directorySchema = new Schema<DataDocument>({
  name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  mobile_number: { type: Number, required: true },
  teliphone_number: { type: Number, required: true },
  work: { type: String, required: true },
  email: { type: String, required: true },
  created_time: { type: String, required: true },
  updated_time: { type: String, required: true },
});

const dir = model<DataDocument>("dir", directorySchema);

export default dir;
