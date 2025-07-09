const config = {
  accessKey: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  defaultBucket: process.env.AWS_S3_BUCKET,
  defaultRegion: process.env.AWS_REGION,
  signatureVersion: "v4",
};

module.exports = config;
