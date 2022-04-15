export interface MonthlyStatisticModel {
  month: string;
  expanses: number[];
  incomes: number[];
  sumIncomes: number;
  sumExpanses: number;
  economy: number;
  percentOfEconomy: number;
}

export interface StatisticsDataModel {
  stats: MonthlyStatisticModel[];
  totalIncome: number;
  totalExpanses: number;
  totalEconomy: number;
  totalPercent: number;
  averageIncome: number;
  averageExpanses: number;
  averageEconomy: number;
  averagePercent: number;
}
