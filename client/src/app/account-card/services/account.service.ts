import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AccountModel } from '../account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: AccountModel[] = [];
  public activeAccount: AccountModel = this.accounts[0];

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<any> {
    return this.http.get('http://localhost:5000/api/myaccount').pipe(
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
}
