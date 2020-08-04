const app = require("../app.js");

test("app should be callable", () => {
  expect(app).toHaveProperty("call");
  expect(app).toHaveProperty("apply");
});

test("app should fail if there is no handler", () => {
  const actual = app("mock");
  expect(actual).toHaveProperty("call");
  expect(actual).toHaveProperty("apply");
  expect(actual()).rejects.toThrow();
});

test("app call result also should be callable", () => {
  const actual = app("mock");
  expect(actual).toHaveProperty("call");
  expect(actual).toHaveProperty("apply");
  const expected = "foo";
  const mock = jest.fn();
  actual(expected, { S: { mock } });
  expect(mock).toHaveBeenCalled();
});
