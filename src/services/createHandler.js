module.exports = ({ S: { contractTable, idGenerator } }) => async (
  contract
) => {
  const id = idGenerator();
  await contractTable.put(id, contract);
  return { id };
};
