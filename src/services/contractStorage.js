const MIN_LENGTH = 5000; // 5KB
const MAX_LENGTH = 10485760; // 10MB
const EXPIRATION = 600; // 10min
const CONTENT_TYPE = "image/*"; // image/*

module.exports = ({ S: { s3 }, env: { CONTRACT_BUCKET: Bucket } }) => ({
  exists(id, type) {
    return s3
      .headObject({
        Bucket,
        Key: `${id}/${type}`,
      })
      .promise()
      .then(
        () => true,
        () => false
      );
  },
  grantUpload(id, type) {
    return s3.createPresignedPost({
      Bucket,
      Fields: {
        key: `${id}/${type}`,
      },
      Conditions: [
        ["eq", "bucket", Bucket],
        ["content-length-range", 104857, 10485760],
      ],
      Expires: EXPIRATION,
      ContentType: CONTENT_TYPE,
    });
  },
});
