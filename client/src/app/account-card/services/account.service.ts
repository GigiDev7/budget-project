import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AccountModel } from '../../shared/models/account.model';
import { URL } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: AccountModel[] = [];
  public activeAccount: AccountModel =
    JSON.parse(localStorage.getItem('account')!) || this.accounts[0];
  public singleAccount!: AccountModel;

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<any> {
    return this.http.get(`${URL}/myaccount`).pipe(
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
    return this.http.get(`${URL}/myaccount/${accountId}`).pipe(
      tap({
        next: (res: any) => (this.singleAccount = res),
      })
    );
  }

  public deleteAccount(accountId: string): Observable<any> {
    return this.http.delete(`${URL}/myaccount/${accountId}`);
  }

  public addAccount(
    title: string,
    currency: string,
    description: string
  ): Observable<any> {
    return this.http.post(`${URL}/myaccount`, { title, currency, description });
  }

  public setAccount(account: AccountModel): void {
    localStorage.setItem('account', JSON.stringify(account));
  }

  public updateAccount(
    title: string,
    currency: string,
    description: string,
    accountId: string
  ): Observable<any> {
    return this.http.patch(`${URL}/myaccount/${accountId}`, {
      title,
      currency,
      description,
    });
  }
}
