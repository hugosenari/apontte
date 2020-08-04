module.exports = ({
  S: {
    contractTable,
    states,
    errors: { badRequest },
  },
}) => async (contract, { params: { id } }) => {
  const actual = await contractTable.get(id);
  const { state } = actual;
  if (!states.canUpdate(state)) {
    badRequest(`Cannot update when state is ${state}`);
  }
  await contractTable.put(id, { ...actual, ...contract }, state);
  return { id };
};
