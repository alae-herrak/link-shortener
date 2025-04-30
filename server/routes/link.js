const express = require("express");
const router = express.Router();
const { shortenURL, getOriginalURL } = require("../controllers/link.js");

router.post("/shorten", shortenURL);
router.get("/:shortUrl", getOriginalURL);

module.exports = router;
