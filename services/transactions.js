const Transaction = require("../models/transactionSchema");

const findAllTransactions = async (accountId) => {
  const transactions = Transaction.find({ accountId }).populate("categories");
  return transactions;
};

const addTransaction = async (accountId, data, userId) => {
  const transactionData = { ...data, accountId, userId };
  const transaction = await Transaction.create(transactionData);
  return transaction;
};

const findSingleTransaction = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId).populate(
    "categories"
  );
  return transaction;
};

const findTransactionAndUpdate = async (transactionId, data) => {
  const transaction = await Transaction.findByIdAndUpdate(transactionId, data, {
    new: true,
  }).populate("categories");
  return transaction;
};

const findTransactionAndDelete = async (transactionId) => {
  await Transaction.findByIdAndDelete(transactionId);
};

const findTransactionsByCategory = async (accountId, category, type) => {
  const transactions = await Transaction.find({
    accountId,
    category,
    type,
  }).populate("categories");
  return transactions;
};

module.exports = {
  findAllTransactions,
  addTransaction,
  findSingleTransaction,
  findTransactionAndUpdate,
  findTransactionAndDelete,
  findTransactionsByCategory,
};
