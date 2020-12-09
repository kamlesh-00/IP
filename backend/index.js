const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authenticate = require("./routes/authentication");
app.use("/api/authenticate", authenticate);

const port = 5000 || process.env.PORT;

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Connected at port: ", port);
});
