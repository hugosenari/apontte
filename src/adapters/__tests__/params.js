const params = require("../params.js");

test("params should be callable", () => {
  expect(params).toHaveProperty("call");
  expect(params).toHaveProperty("apply");
});

test("params call should merge pathParameters, queryStringParameters", () => {
  const actual = params({
    event: {
      pathParameters: {
        foo: "bar",
      },
      queryStringParameters: {
        bar: "foo",
      },
    },
  });
  expect(actual).toHaveProperty("params");
  expect(actual).toHaveProperty(["params", "foo"], "bar");
  expect(actual).toHaveProperty(["params", "bar"], "foo");
});

test("params call should merge not fail without event parameters", () => {
  const actual = params({
    event: {},
  });
  expect(actual).toHaveProperty("params");
});
