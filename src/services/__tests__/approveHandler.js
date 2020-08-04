const service = require("../approveHandler.js");

describe("approveHandler", () => {
  const context = {};

  beforeEach(() => {
    context.params = {
      id: "foo",
    };
    context.S = {
      contractTable: {
        get: () => ({}),
        put: () => ({}),
      },
      states: {
        canFinalize: () => false,
      },
      errors: {
        badRequest: () => {
          throw new Error("badRequest");
        },
        notFound: () => {
          throw new Error("notFound");
        },
      },
    };
  });

  test("should throw notFound when get return empty object", () => {
    const target = service(context);
    return expect(target(true, context)).rejects.toThrow("notFound");
  });

  test("should throw badRequest when cannot finalize", () => {
    context.S.contractTable.get = () => ({ state: "foo" });
    const target = service(context);
    return expect(target(true, context)).rejects.toThrow("badRequest");
  });

  test("should throw badRequest when cannot finalize", async () => {
    const mock = jest.fn();
    context.S.contractTable = {
      get: () => ({ state: "foo" }),
      put: mock,
    };
    context.S.states.canFinalize = () => true;
    const target = service(context);
    await expect(target(true, context));
    return expect(mock).toHaveBeenCalled();
  });
});
