const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const TELEGRAM_TOKEN = "8687534107:AAGBGRR74rfjYGeoV2erjk01piWdMCePMps";
const CHAT_ID = "8202147321";

app.post("/upload", async (req, res) => {
  try {
    const img = req.body.image;
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`,
      {
        chat_id: CHAT_ID,
        photo: img
      }
    );
    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () =>
  console.log("Backend running — ready to receive images!")
);