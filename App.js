const express = require("express");
const bodyParser = require("body-parser");
const translate = require("translate-google");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  try {
    if (!req.body || !req.body.text) {
      return res
        .status(400)
        .json({ error: "Invalid request body. Provide text to translate" });
    }
    const translatedText = await translate(req.body.text, { to: "fr" });
    res.json({ translation: translatedText });
  } catch (error) {
    console.log("Translated error:", error.message);
    res.send(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
