const getAllAccounts = (req, res) => {
  res.status(200).send("all user accounts");
};

const getSingleAccount = (req, res) => {
  const { accountId } = req.params;
  res.status(200).send(`single account ${accountId}`);
};

const createAccount = (req, res) => {
  // get data from req.body
  res.status(201).send("created");
};

const updateAccount = (req, res) => {
  //get data from req.body
  const { accountId } = req.params;
  res.status(200).send(`updated ${accountId}`);
};

const deleteAccount = (req, res) => {
  const { accountId } = req.params;
  res.status(200).send(`deleted ${accountId}`);
};

const getAccountSum = (req, res) => {
  const { accountId } = req.params;
  res.status(200).send("account sum");
};

module.exports = {
  getAllAccounts,
  getSingleAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountSum,
};
