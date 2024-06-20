import dataChunks from "../constants/pdConstants.js";

let connectionString = [
  "mongodb+srv://",
  dataChunks.DBUser,
  ":",
  dataChunks.DBPass,
  "@cluster0.br6n1f3.mongodb.net/",
].join("");

export default connectionString;
