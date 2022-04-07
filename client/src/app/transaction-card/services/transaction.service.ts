import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TransactionModel } from '../transaction.model';

const URL = 'http://localhost:5000/api/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions!: TransactionModel[];
  public singleTransaction!: TransactionModel;

  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<any> {
    return this.http
      .get(`${URL}/${accountId}`)
      .pipe(tap({ next: (res: any) => (this.transactions = res) }));
  }

  public getSingleTransaction(transactionId: string): Observable<any> {
    return this.http.get(`${URL}/transaction/${transactionId}`).pipe(
      tap({
        next: (res: any) => (this.singleTransaction = res),
      })
    );
  }

  public deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete(`${URL}/transaction/${transactionId}`);
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
    return this.http.post(`${URL}/${accountId}`, {
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
    return this.http.patch(`${URL}/transaction/${transactionId}`, {
      title,
      categories,
      amount,
      type,
      transactionDate,
      description,
    });
  }
}
