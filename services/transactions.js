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

const findSingleTransaction = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);
  return transaction;
};

const findTransactionAndUpdate = async (transactionId, data) => {
  const transaction = await Transaction.findByIdAndUpdate(transactionId, data, {
    new: true,
  });
  return transaction;
};

module.exports = {
  findAllTransactions,
  addTransaction,
  findSingleTransaction,
  findTransactionAndUpdate,
};
