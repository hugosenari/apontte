const INITIAL = "initial",
  PICS = "pictures",
  APPROVAL = "approval",
  FINALIZED = "finalized";

const stateNext = {
  [INITIAL]: PICS,
  [PICS]: APPROVAL,
  [APPROVAL]: FINALIZED,
};

module.exports = () => ({
  INITIAL,
  PICS,
  APPROVAL,
  FINALIZED,
  next: (state) => stateNext[state] || INITIAL,
  canUpload: (state) => [PICS, APPROVAL].some((s) => s == state),
  canUpdate: (state) => state != FINALIZED,
  canFinalize: (state) => state == APPROVAL,
});
