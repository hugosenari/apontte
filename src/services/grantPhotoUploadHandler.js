module.exports = ({
  S: {
    contractStorage,
    contractTable,
    states,
    errors: { badRequest, notFound },
  },
}) => async (evt, { params: { id, type } }) => {
  const { state } = await contractTable.get(id);
  if (!state) notFound("Contract not found");

  if (!states.canUpload(state))
    badRequest(`Cannot upload when state is: ${state}.`);

  return contractStorage.grantUpload(id, type);
};
