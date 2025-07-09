const express = require("express");
const mime = require("mime-types");
const getS3PutLink = require("./getS3PutLink");
const getS3SignedLink = require("./getS3SignedLink");

const router = express.Router();

router.post("/get-put-link", async (req, res) => {
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
  const signedLink = await getS3PutLink(uniqueKeyName, mimeType); // default region and bucket
  console.log({ signedLink });

  // express sends back the link and waits for confirmation from the upload
  res.json({
    signedLink,
    mimeType,
    uniqueKeyName,
  });
});

router.get("/test", (req, res) => {
  res.json("Test");
});

router.post("/finalize-upload", (req, res) => {
  const { key } = req.body;

  // all the stuff we need to do is here when we know that
  // upload to S3 was successful

  const signedLink = getS3SignedLink(key);
  res.json({ link: signedLink });
});

module.exports = router;
