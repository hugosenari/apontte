module.exports = ({
  S: {
    ddbClient,
    states: { INITIAL },
  },
  env: { CONTRACT_TABLE: TableName },
}) => ({
  put: async (id, contract, state = INITIAL) => {
    await ddbClient
      .put({
        TableName,
        Item: {
          ...contract,
          id,
          state,
        },
      })
      .promise();
    return id;
  },
  get: async (id) => {
    const { Item } = await ddbClient
      .get({
        TableName,
        Key: { id },
      })
      .promise();
    return Item;
  },
});
