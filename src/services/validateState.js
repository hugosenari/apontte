module.exports = ({
  S: {
    contractStorage,
    states: { next, PICS, APPROVAL },
    photoTypes: { IDENTITY },
    errors: { badRequest },
  },
}) => ({
  [PICS]: ({ name, email, cpf, requestedValue, state }) => {
    if (!name && !email && !cpf && !requestedValue) {
      const invalidInfo = {
        name: !!name,
        email: !!email,
        cpf: !!cpf,
        requestedValue: !!requestedValue,
      };
      badRequest(`Missing contract info ${JSON.stringify(invalidInfo)}`);
    }
  },
  [APPROVAL]: async ({ id, name }) => {
    if (!contractStorage.exists(id, IDENTITY)) {
      await badRequest(`Missing photo of ${name} ID`);
    }
  },
});
