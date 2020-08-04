module.exports = (handlerKey) => async (event, laconiaCtx) => {
  const { S: services = {} } = laconiaCtx || {};
  const handler = services[handlerKey];
  return handler(event, laconiaCtx);
};
