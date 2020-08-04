module.exports = ({
  R: { "aws-sdk": AWS },
  env: { S3_ACCESS_KEY, S3_SECRET_KEY, S3_URL },
}) => {
  const opts = {};
  if (S3_URL) {
    opts.endpoint = S3_URL;
    opts.accessKeyId = S3_ACCESS_KEY;
    opts.secretAccessKey = S3_SECRET_KEY;
  }
  return new AWS.S3(opts);
};
