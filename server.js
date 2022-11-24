const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT;
const app = express();
require("dotenv").config();

// console.log(db);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(" port is running on http://localhost:3001/");
  });
});
