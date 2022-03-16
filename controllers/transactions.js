const {
  findAllTransactions,
  addTransaction,
  findSingleTransaction,
  findTransactionAndUpdate,
} = require("../services/transactions");

const getTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = await findAllTransactions(accountId);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTransaction = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transaction = await addTransaction(accountId, req.body, req.userId);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await findSingleTransaction(transactionId);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await findTransactionAndUpdate(transactionId, req.body);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
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
