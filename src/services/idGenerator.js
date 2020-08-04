module.exports = ({
  R: {
    uuid: { v1, v5 },
  },
  env: { RND_KEY },
}) => () => v5(v1(), RND_KEY);
