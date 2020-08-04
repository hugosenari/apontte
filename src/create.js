const handlerAdapter = require("./adapters/api");

exports.handler = handlerAdapter("createHandler", { responseStatusCode: 201 });
