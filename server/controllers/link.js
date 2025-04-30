const Link = require("../models/Link.js");
const shortid = require("shortid");
const validUrl = require("valid-url");

async function shortenURL(req, res) {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    let link = await Link.findOne({ originalUrl });

    if (link) {
      return res.json({ shortUrl: link.shortUrl });
    } else {
      const shortUrl = shortid.generate();
      link = new Link({
        originalUrl,
        shortUrl: `${req.protocol}://${req.get("host")}/links/${shortUrl}`,
        createdAt: new Date(),
      });

      await link.save();
      return res.status(201).json({ shortUrl: link.shortUrl });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}

async function getOriginalURL(req, res) {
  try {
    const { shortUrl } = req.params;
    const link = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/links/${shortUrl}`,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(link.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}

module.exports = { shortenURL, getOriginalURL };
