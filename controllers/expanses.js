const getExpanses = (req, res) => {
  const { accountId } = req.params;
  res.status(200).send(`expanses from accouunt ${accountId}`);
};

const createExpanse = (req, res) => {
  const { accountId } = req.params;
  //data from req.body
  res.status(201).send("create expanse");
};

const updateExpanse = (req, res) => {
  const { accountId, expanseId } = req.params;
  //data from req.body
  res.status(200).send(`${accountId}-${expanseId} updated`);
};

const deleteExpanse = (req, res) => {
  const { accountId, expanseId } = req.params;
  res.status(200).send(`${accountId}-${expanseId} deleted`);
};

module.exports = {
  getExpanses,
  createExpanse,
  updateExpanse,
  deleteExpanse,
};
