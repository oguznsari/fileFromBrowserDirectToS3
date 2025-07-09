const aws = require("aws-sdk");
const config = require("./config");

aws.config.update(config);

const getS3SignedLink = (key, bucket = config.defaultBucket) => {
  const s3 = new aws.S3({});
  const signedUrlExpire = 60 * 60; // expires in 1 hour
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: signedUrlExpire,
  };

  const signedUrl = s3.getSignedUrl("getObject", params);

  return signedUrl;
};

module.exports = getS3SignedLink;
