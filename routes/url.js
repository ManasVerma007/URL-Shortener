const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handlegetAnalytics,
  handleVistURL,
  handleShowAllURL,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
// .get("/", handleShowAllURL);

router.get("/analytics/:shortId", handlegetAnalytics);

router.get("/:shortId", handleVistURL);
module.exports = router;
