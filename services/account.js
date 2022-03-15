const Account = require("../models/accountSchema");

const findAllAccounts = async (userId) => {
  const accounts = await Account.find({ userId });
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

module.exports = {
  findAllAccounts,
  addAcount,
  findSingleAccount,
  findAccountAndUpdate,
};
