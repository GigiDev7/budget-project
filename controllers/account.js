const {
  findAllAccounts,
  addAcount,
  findSingleAccount,
  findAccountAndUpdate,
  findAccountAndDelete,
  calculateAccountSum,
} = require("../services/account");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await findAllAccounts(req.userId);
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await findSingleAccount(accountId);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createAccount = async (req, res) => {
  try {
    const account = await addAcount(req.userId, req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await findAccountAndUpdate(accountId, req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    await findAccountAndDelete(accountId);
    res.status(204).send("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAccountSum = async (req, res) => {
  try {
    const { accountId } = req.params;
    const sum = await calculateAccountSum(accountId);
    res.status(200).json({ sum });
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllAccounts,
  getSingleAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountSum,
};
