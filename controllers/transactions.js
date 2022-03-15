const getTransactions = (req, res) => {
  const { accountId } = req.params;
  res.status(200).send("transactions");
};

const createTransaction = (req, res) => {
  const { accountId } = req.params;
  res.status(201).send("create transaction");
};

const getTransaction = (req, res) => {
  const { accountId, transactionId } = req.params;
  res.status(200).send("transaction");
};

const updateTransaction = (req, res) => {
  const { accountId, transactionId } = req.params;
  res.status(200).send("updated transaction");
};

const deleteTransaction = (req, res) => {
  const { accountId, transactionId } = req.params;
  res.status(200).send("deleted transaction");
};

module.exports = {
  getTransaction,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
