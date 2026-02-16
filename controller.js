export const getUsernameController = (req, res) => {
  const username = req.params.username;
  res.send(`This is about ${username}`);
};

export const searchUsernameController = (req, res) => {
  const query = req.query.username;
  res.send(`You searched for ${query}`);
};
