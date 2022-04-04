export interface TransactionModel {
  _id: string;
  title: string;
  amount: number;
  createdAt: Date;
  category: string;
  type: string;
}
