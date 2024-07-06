import { Document, Schema, model, Types } from "mongoose";
type ContactInfo = {
  type: string;
  number: number;
};
type DataDocument = Document & {
  _id: Types.ObjectId;
  name: string;
  numbers: ContactInfo[];
  work: string;
  email: string;
  created_time: Date;
  updated_time: Date;
};
const phoneNumberSchema = new Schema<ContactInfo>({
  type: { type: String, required: true },
  number: { type: Number, required: true },
});

const directorySchema = new Schema<DataDocument>({
  name: { type: String, required: true },
  numbers: { type: [phoneNumberSchema], required: true },
  work: { type: String, required: true },
  email: { type: String, required: true },
  created_time: { type: Date, required: true },
  updated_time: { type: Date, required: true },
});

const dir = model<DataDocument>("dir", directorySchema);

export default dir;
