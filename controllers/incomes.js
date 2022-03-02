const getIncomes = (req, res) => {
  const { accountId } = req.params;
  res.status(200).send("incomes");
};

const createIncome = (req, res) => {
  const { accountId } = req.params;
  res.status(201).send("create income");
};

const updateIncome = (req, res) => {
  const { accountId, incomeId } = req.params;
  res.status(200).send("update income");
};

const deleteIncome = (req, res) => {
  const { accountId, incomeId } = req.params;
  res.status(200).send("delete income");
};

module.exports = {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
};
