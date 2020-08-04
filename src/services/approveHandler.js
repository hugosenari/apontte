module.exports = ({
  S: {
    contractTable,
    states,
    errors: { badRequest, notFound },
  },
}) => async (approved, { params: { id } }) => {
  const actual = await contractTable.get(id);
  const { state } = actual;
  if (!state) notFound("Contract not found");

  if (!states.canFinalize(state)) {
    badRequest(`Cannot approve/reprove when state is ${state}`);
  }
  await contractTable.put(
    id,
    {
      actual,
      ...approved,
    },
    states.FINALIZED
  );
  return { id };
};
