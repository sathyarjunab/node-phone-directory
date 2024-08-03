import dataChunks from "../constants/Constants";

let connectionString = [
  "mongodb+srv://",
  dataChunks.dbUser,
  ":",
  dataChunks.dbPass,
  "@cluster0.br6n1f3.mongodb.net/",
].join("");

export default connectionString;
