module.exports = ({ R: { "aws-sdk": AWS }, env: { DDB_URL } }) => {
  const opts = {};
  if (DDB_URL) {
    opts.endpoint = DDB_URL;
  }
  return new AWS.DynamoDB.DocumentClient(opts);
};
