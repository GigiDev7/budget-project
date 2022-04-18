import { Injectable } from '@angular/core';
import { CurrencyModel } from '../shared/models/currency.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { URL } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  public currencies!: CurrencyModel[];
  public defaultCurrency: string = '';

  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<any> {
    return this.http.get(`${URL}/currency`).pipe(
      tap({
        next: (res: any) => {
          this.currencies = res;
        },
        complete: () => this.setDefaultCurrency(),
      })
    );
  }

  private setDefaultCurrency(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const defaultCurrency = this.currencies.find(
      (el) => el.countryName === user.residence
    );
    if (defaultCurrency) this.defaultCurrency = defaultCurrency.symbol;
  }
}
