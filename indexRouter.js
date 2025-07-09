const express = require("express");
const mime = require("mime-types");
const router = express.Router();

router.get("/get-put-link", (req, res) => {
  // can the user upload this file
  // put link to upload from browser

  const { fileName, fileSize, fileType } = req.body;

  // make a unique name for a file => timestamp
  // encodeUri makes the name url safe like ' ' => becomes => %20
  const uniqueKeyName = `${Date.now().toString()}-${encodeURIComponent(
    fileName
  )}`;

  const mimeType = mime.lookup(fileName);

  // getS3PutLink

  res.json("Test");
});

router.get("/test", (req, res) => {
  res.json("Test");
});

module.exports = router;
