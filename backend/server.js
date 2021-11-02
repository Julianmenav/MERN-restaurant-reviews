require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const restaurants = require("./routes/restaurants");
const errorHandler = require("./middleware/error-handler");

app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({ error: "route not found" }));
app.use(errorHandler);

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("Connected to DB"));
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
