const express = require("express");
const app = express();
const mongoose = require("mongoose");

//init express inbuilt bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//import routes
const addUser = require("./routes/User");
//dotenv for secrets and enviromental variables
require("dotenv").config();

const url = process.env.mongoDbUrl;
console.log("process.env", url);

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//middleware for routes
app.use("/", addUser);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
