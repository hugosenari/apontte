const { handler } = require("../update.js");

test("handler should be callable", () => {
  expect(handler).toHaveProperty("call");
  expect(handler).toHaveProperty("apply");
});
