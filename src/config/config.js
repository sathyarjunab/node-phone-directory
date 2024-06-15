import data_chunks from "../constants/pd_constants.js";

let connectionString = [
  "mongodb+srv://",
  data_chunks.DB_user,
  ":",
  data_chunks.DB_pass,
  "@cluster0.br6n1f3.mongodb.net/",
].join("");

export default connectionString;
