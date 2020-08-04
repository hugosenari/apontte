module.exports = ({
  event: { pathParameters = {}, queryStringParameters = {} },
}) => ({
  params: {
    ...queryStringParameters,
    ...pathParameters,
  },
});
