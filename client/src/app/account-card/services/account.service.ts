import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AccountModel } from '../account.model';

const URL = 'http://localhost:5000/api/myaccount';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: AccountModel[] = [];
  public activeAccount: AccountModel = this.accounts[0];
  public singleAccount!: AccountModel;

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<any> {
    return this.http.get(URL).pipe(
      tap({
        next: (res: any) => {
          this.accounts = res;
        },
      })
    );
  }

  public activateAccount(id: string): void {
    const account = this.accounts.find((el) => el._id === id);
    this.activeAccount = account!;
  }

  public getSingleAccount(accountId: string): Observable<any> {
    return this.http.get(`${URL}/${accountId}`).pipe(
      tap({
        next: (res: any) => (this.singleAccount = res),
      })
    );
  }

  public deleteAccount(accountId: string): Observable<any> {
    return this.http.delete(`${URL}/${accountId}`);
  }
}
