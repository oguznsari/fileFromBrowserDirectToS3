// generates a put link for the browser
// signed and validated
const aws = require("aws-sdk");
const config = require("./config");

console.log({ config });

// conf aws module to use our account
aws.config.update({
  accessKeyId: config.accessKey,
  secretAccessKey: config.secretAccessKey,
  region: config.defaultRegion,
  signatureVersion: config.signatureVersion,
});

const getS3PutLink = (
  uniqueS3Key,
  mimeType,
  bucket = config.defaultBucket,
  region = config.defaultRegion
) => {
  return new Promise(async (resolve, reject) => {
    // get link from s3
    const options = {
      bucket,
      region,
      signatureVersion: config.signatureVersion,
      signatureExpires: 60, // secs link will be valid for
      ACL: "private",
      uniquePrefix: true, // default, if false will let same name
    };

    const s3 = new aws.S3(options);
    const params = {
      Bucket: bucket,
      Key: uniqueS3Key,
      Expires: 60, // in seconds
      ContentType: mimeType,
      ACL: "private",
    };

    // we run s3.getSignedUrl and pass: 1. action, 2. params, 3. callback
    s3.getSignedUrl("putObject", params, (err, signedLink) => {
      if (err) throw err; // Don't do it in production grade apps
      resolve(signedLink);
    });
  });
};

module.exports = getS3PutLink;
