const {
  findAllTransactions,
  addTransaction,
  findSingleTransaction,
  findTransactionAndUpdate,
  findTransactionAndDelete,
  findTransactionsByCategory,
} = require("../services/transactions");

const getTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { category } = req.query;
    let transactions;
    if (category) {
      transactions = await findTransactionsByCategory(accountId, category);
      return res.status(200).json(transactions);
    }
    transactions = await findAllTransactions(accountId);
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

const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    await findTransactionAndDelete(transactionId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getTransaction,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
