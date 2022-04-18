import { CategoryModel } from './category.model';

export interface TransactionModel {
  _id: string;
  title: string;
  amount: number;
  createdAt: Date;
  categories: CategoryModel[];
  type: string;
  description: string;
  transactionDate: Date;
}
