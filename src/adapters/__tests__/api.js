const api = require("../api.js");

test("api should be callable", () => {
  expect(api).toHaveProperty("call");
  expect(api).toHaveProperty("apply");
});

test("api call result also should be callable", () => {
  const actual = api();
  expect(actual).toHaveProperty("call");
  expect(actual).toHaveProperty("apply");
});
