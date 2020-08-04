const genericError = (msg, code = 500) => {
  const error = new Error(
    JSON.stringify({
      error: msg,
    })
  );
  error.statusCode = code;
  throw error;
};
module.exports = () => ({
  badRequest: (msg, code = 400) => genericError(msg, code),
  notFound: (msg, code = 404) => genericError(msg, code),
});
