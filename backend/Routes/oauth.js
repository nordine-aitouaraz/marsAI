const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/oauth2callback",
);

router.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("REFRESH TOKEN 👉", tokens.refresh_token);
    res.json({
      message: "OAuth OK",
      refresh_token: tokens.refresh_token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OAuth failed" });
  }
});

module.exports = router;
