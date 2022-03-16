const Transaction = require("../models/transactionSchema");

const findAllTransactions = async (accountId) => {
  const transactions = Transaction.find({ accountId });
  return transactions;
};

const addTransaction = async (accountId, data, userId) => {
  const transactionData = { ...data, accountId, userId };
  const transaction = await Transaction.create(transactionData);
  return transaction;
};

module.exports = {
  findAllTransactions,
  addTransaction,
};
