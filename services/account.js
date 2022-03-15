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

module.exports = {
  findAllAccounts,
  addAcount,
};
