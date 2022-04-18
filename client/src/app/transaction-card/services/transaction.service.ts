import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TransactionModel } from '../../shared/models/transaction.model';
import { URL } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions!: TransactionModel[];
  public singleTransaction!: TransactionModel;

  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<any> {
    return this.http
      .get(`${URL}/transactions/${accountId}`)
      .pipe(tap({ next: (res: any) => (this.transactions = res) }));
  }

  public getSingleTransaction(transactionId: string): Observable<any> {
    return this.http
      .get(`${URL}/transactions/transaction/${transactionId}`)
      .pipe(
        tap({
          next: (res: any) => (this.singleTransaction = res),
        })
      );
  }

  public deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete(`${URL}/transactions/transaction/${transactionId}`);
  }

  public addTransaction(
    accountId: string,
    title: string,
    categories: string[],
    amount: number,
    type: string,
    transactionDate: Date,
    description: string
  ): Observable<any> {
    return this.http.post(`${URL}/transactions/${accountId}`, {
      title,
      categories,
      amount,
      type,
      transactionDate,
      description,
    });
  }

  public updateTransaction(
    transactionId: string,
    title: string,
    categories: string[],
    amount: number,
    type: string,
    transactionDate: Date,
    description: string
  ): Observable<any> {
    return this.http.patch(`${URL}/transactions/transaction/${transactionId}`, {
      title,
      categories,
      amount,
      type,
      transactionDate,
      description,
    });
  }
}
