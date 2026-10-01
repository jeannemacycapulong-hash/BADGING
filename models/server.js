require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');
const urlParser = require('url');
const cors = require('cors');
const Url = require('./models/url'); // Adjust path if needed

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false })); // Crucial for parsing POST form data
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.post('/api/shorturl', async (req, res) => {
  const originalUrl = req.body.url;

  const parsedUrl = urlParser.parse(originalUrl);
  
  if (!parsedUrl.hostname) {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(parsedUrl.hostname, async (err) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    try {
      const count = await Url.countDocuments({});
      
      let foundUrl = await Url.findOne({ original_url: originalUrl });
      
      if (foundUrl) {
        return res.json({
          original_url: foundUrl.original_url,
          short_url: foundUrl.short_url
        });
      }

      // Create new entry
      const newUrl = new Url({
        original_url: originalUrl,
        short_url: count + 1
      });

      await newUrl.save();
      
      res.json({
        original_url: newUrl.original_url,
        short_url: newUrl.short_url
      });

    } catch (dbErr) {
      console.error(dbErr);
      res.status(500).json({ error: 'Server error' });
    }
  });
});

app.get('/api/shorturl/:short_url', async (req, res) => {
  const shortUrl = req.params.short_url;

  try {
    const foundUrl = await Url.findOne({ short_url: shortUrl });
    if (foundUrl) {
      return res.redirect(foundUrl.original_url);
    } else {
      return res.json({ error: 'No short URL found for the given input' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});