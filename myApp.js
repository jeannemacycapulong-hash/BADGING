require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS so FreeCodeCamp's test runner can query your API without being blocked
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Basic route to verify server is running
app.get('/', (req, res) => {
  res.send('Database Connected Successfully');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Mandatory export for FreeCodeCamp's automated tests
module.exports = mongoose;