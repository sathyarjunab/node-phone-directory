if (!process.env.DBUser || !process.env.DBPass) {
  throw new Error("DSUser and DBPass is undefined");
}

const DBUser: string = process.env.DBUser;
const DBPass: string = process.env.DBPass;

export default { DBUser, DBPass };
