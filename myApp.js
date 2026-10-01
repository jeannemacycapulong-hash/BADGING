require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB!");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
  res.send("MongoDB connection is working!");
});


app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});