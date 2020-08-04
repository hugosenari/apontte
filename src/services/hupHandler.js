module.exports = ({
  S: {
    contractTable,
    validateState,
    states: { next },
  },
}) => async (evt, { params: { id } }) => {
  const contract = await contractTable.get(id);
  const nextState = next(contract.state);
  const validateStateOf = validateState[nextState] || ((v) => v);
  await validateStateOf(contract);
  await contractTable.put(id, contract, nextState);
  return { id };
};
