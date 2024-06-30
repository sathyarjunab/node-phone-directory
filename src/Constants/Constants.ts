// if (!process.env.DBUser || !process.env.DBPass) {
//   throw new Error("DSUser and DBPass is undefined");
// }
//NEED TO CHANGE THE PACKAGE.JSON FILE FOR OBTAINING THE ENVIRONMENT VARIABEL WITH OUT ANY EXTERNAL PACKAGE(LIKE DOTENV)
const DBUser: string = "sathyarjun007";
const DBPass: string = "SSgafPRhTbgsRWL0";

export default { DBUser, DBPass };
// DBUser:string = "sathyarjun007";
// DBPass:string = "SSgafPRhTbgsRWL0";
// process.env.DBPass
// process.env.DBUser
