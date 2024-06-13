let express = require("express");
let bodyParser = require("body-parser");

let crud_routes = require("./routes/pd_routes");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(crud_routes);

app.listen(3000);
