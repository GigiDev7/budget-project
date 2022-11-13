const Account = require("../server/models/accountSchema");
const Transaction = require("../server/models/transactionSchema");

const findAllAccounts = async (userId) => {
  const accounts = await Account.find({ userId }).sort("createdAt");
  return accounts;
};

const addAcount = async (userId, data) => {
  const accountData = { ...data, userId };
  const account = await Account.create(accountData);
  return account;
};

const findSingleAccount = (accountId) => {
  const account = Account.findById(accountId);
  return account;
};

const findAccountAndUpdate = async (accountId, data) => {
  const account = await Account.findByIdAndUpdate(accountId, data, {
    new: true,
  });
  return account;
};

const findAccountAndDelete = async (accountId) => {
  await Account.findByIdAndDelete(accountId);
  await Transaction.deleteMany({ accountId });
};

const calculateAccountSum = async (accountId) => {
  const transactions = await Transaction.find({ accountId });
  const sum = transactions.reduce((acc, el) => acc + el.amount, 0);
  return sum;
};

module.exports = {
  findAllAccounts,
  addAcount,
  findSingleAccount,
  findAccountAndUpdate,
  findAccountAndDelete,
  calculateAccountSum,
};
