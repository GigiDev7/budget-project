import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TransactionModel } from '../transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions!: TransactionModel[];
  public singleTransaction!: TransactionModel;

  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<any> {
    return this.http
      .get(`http://localhost:5000/api/transactions/${accountId}`)
      .pipe(tap({ next: (res: any) => (this.transactions = res) }));
  }

  public getSingleTransaction(transactionId: string): Observable<any> {
    return this.http
      .get(
        `http://localhost:5000/api/transactions/transaction/${transactionId}`
      )
      .pipe(
        tap({
          next: (res: any) => (this.singleTransaction = res),
        })
      );
  }
}
