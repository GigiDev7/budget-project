const Transaction = require("../server/models/transactionSchema");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

exports.getStatsData = async (startDate, endDate, accountId) => {
  //get transactions in range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const transactions = await Transaction.find({
    transactionDate: { $gte: start, $lte: end },
    accountId,
  });

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();
  const statsObj = {};

  //if years are same
  if (startYear === endYear) {
    for (let j = startMonth; j <= endMonth; j++) {
      const tempName = `${startYear} ${monthNames[j]}`;
      statsObj[tempName] = {
        expanses: [],
        incomes: [],
      };
    }

    //if years are not same
  } else {
    for (let i = startYear; i <= endYear; i++) {
      if (i === startYear) {
        for (let j = startMonth; j < 12; j++) {
          const tempName = `${i} ${monthNames[j]}`;
          statsObj[tempName] = {
            expanses: [],
            incomes: [],
          };
        }
      } else if (i > startYear && i < endYear) {
        for (let j = 0; j < 12; j++) {
          const tempName = `${i} ${monthNames[j]}`;
          statsObj[tempName] = {
            expanses: [],
            incomes: [],
          };
        }
      } else {
        for (let j = 0; j <= endMonth; j++) {
          const tempName = `${i} ${monthNames[j]}`;
          statsObj[tempName] = {
            expanses: [],
            incomes: [],
          };
        }
      }
    }
  }

  for (let trans of transactions) {
    const month = monthNames[new Date(trans.transactionDate).getMonth()];
    const year = new Date(trans.transactionDate).getFullYear();
    const tempName = `${year} ${month}`;
    if (trans.type === "expanse") {
      statsObj[tempName].expanses.push(trans.amount);
    } else if (trans.type === "income") {
      statsObj[tempName].incomes.push(trans.amount);
    }
  }

  calcSum(statsObj);
  const stats = transform(statsObj);

  //totals
  const totalIncome = stats.reduce((acc, el) => acc + el.sumIncomes, 0);
  const totalExpanses = stats.reduce((acc, el) => acc + el.sumExpanses, 0);
  const totalEconomy = stats.reduce((acc, el) => acc + el.economy, 0);
  const totalPercent = stats.reduce((acc, el) => acc + el.percentOfEconomy, 0);

  //averages
  const averageIncome = totalIncome / stats.length;
  const averageExpanses = totalExpanses / stats.length;
  const averageEconomy = totalEconomy / stats.length;
  const averagePercent = totalPercent / stats.length;

  return {
    stats,
    totalIncome,
    totalExpanses,
    totalEconomy,
    totalPercent: Math.round(totalPercent * 100) / 100,
    averageIncome: Math.round(averageIncome * 100) / 100,
    averageExpanses: Math.round(averageExpanses * 100) / 100,
    averageEconomy: Math.round(averageEconomy * 100) / 100,
    averagePercent: Math.round(averagePercent * 100) / 100,
  };
};

const calcSum = (obj) => {
  for (const key in obj) {
    let sumExpanses;
    let sumIncomes;
    if (obj[key].expanses.length === 0) {
      sumExpanses = 0;
    } else {
      sumExpanses = obj[key].expanses.reduce((acc, el) => acc + el, 0);
    }

    if (obj[key].incomes.length === 0) {
      sumIncomes = 0;
    } else {
      sumIncomes = obj[key].incomes.reduce((acc, el) => acc + el, 0);
    }
    obj[key]["sumExpanses"] = sumExpanses;
    obj[key]["sumIncomes"] = sumIncomes;
    obj[key]["economy"] = sumIncomes - sumExpanses;

    let percentage;
    if (sumIncomes === 0 && sumExpanses === 0) {
      percentage = 0;
    } else if (sumIncomes === 0 && sumExpanses !== 0) {
      percentage = -100;
    } else if (sumExpanses === 0 && sumIncomes !== 0) {
      percentage = 100;
    } else {
      percentage = ((sumIncomes - sumExpanses) / sumIncomes) * 100;
    }

    obj[key]["percentOfEconomy"] = Math.round(percentage * 100) / 100;
  }
};

const transform = (obj) => {
  const result = [];
  for (const key in obj) {
    const newObj = {
      month: key,
      ...obj[key],
    };
    result.push(newObj);
  }
  return result;
};

exports.getCategoryStats = async (startDate, endDate, accountId) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const transactions = await Transaction.find({
    transactionDate: { $gte: start, $lte: end },
    accountId,
    type: "expanse",
  }).populate("categories");

  const sumExpanses = transactions.reduce((acc, el) => acc + el.amount, 0);

  const tempObj = {};

  for (let transaction of transactions) {
    for (let category of transaction.categories) {
      tempObj[category.title]
        ? tempObj[category.title].push(transaction.amount)
        : (tempObj[category.title] = [transaction.amount]);
    }
  }

  const stats = [];

  for (const key in tempObj) {
    const sum = tempObj[key].reduce((acc, el) => acc + el, 0);
    const percentage = (sum / sumExpanses) * 100;
    const obj = {
      category: key,
      sum,
      percent: Math.round(percentage * 100) / 100,
    };
    stats.push(obj);
  }

  return {
    stats,
    sumExpanses,
  };
};
