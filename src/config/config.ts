import dataChunks from "../constants/constants";

let connectionString = [
  "mongodb+srv://",
  dataChunks.dbUser,
  ":",
  dataChunks.dbPass,
  "@cluster0.br6n1f3.mongodb.net/",
].join("");

export default connectionString;
