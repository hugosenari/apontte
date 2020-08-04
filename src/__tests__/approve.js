const { handler } = require("../approve.js");

test("handler should be callable", () => {
  expect(handler).toHaveProperty("call");
  expect(handler).toHaveProperty("apply");
});
