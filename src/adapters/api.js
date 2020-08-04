const laconia = require("@laconia/core");
const adapterApi = require("@laconia/adapter-api");
const R = require("laconiar");
const laconias = require("laconias");
const app = require("./app");
const params = require("./params");

const responseAdditionalHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

module.exports = (handlerKey, opts = {}) => {
  const adapter = adapterApi.apigateway({
    inputType: "body",
    responseAdditionalHeaders,
    responseStatusCode: 200,
    errorMappings: {
      ".+": (e) => console.log(e) || e,
    },
    ...opts,
  });
  const S = laconias(`${__dirname}/../services`);
  return laconia(adapter(app(handlerKey)))
    .register(S)
    .register(R())
    .register(params, { cache: { enabled: false } });
};
