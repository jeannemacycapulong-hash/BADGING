require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});