const { getStatsData, getCategoryStats } = require("../services/statistics");

const getStatistics = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { startDate, endDate } = req.body;
    const { type } = req.query;
    if (type === "monthly") {
      const {
        stats,
        totalIncome,
        totalExpanses,
        totalEconomy,
        totalPercent,
        averageIncome,
        averageExpanses,
        averageEconomy,
        averagePercent,
      } = await getStatsData(startDate, endDate, accountId);
      res.status(200).json({
        stats,
        totalIncome,
        totalExpanses,
        totalEconomy,
        totalPercent,
        averageIncome,
        averageExpanses,
        averageEconomy,
        averagePercent,
      });
    } else if (type === "category") {
      const { stats, sumExpanses } = await getCategoryStats(
        startDate,
        endDate,
        accountId
      );
      res.status(200).json({ stats, sumExpanses });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getStatistics,
};
