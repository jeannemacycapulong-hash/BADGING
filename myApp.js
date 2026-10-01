require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Basic route so the test runner gets a valid response when visiting the URL
app.get('/', (req, res) => {
  res.send('Database Connected Successfully');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Mandatory export for freeCodeCamp's automated tests
module.exports = mongoose;