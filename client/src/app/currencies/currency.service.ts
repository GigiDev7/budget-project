import { Injectable } from '@angular/core';
import { CurrencyModel } from './currency.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const URL = 'http://localhost:5000/api/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  public currencies!: CurrencyModel[];
  public defaultCurrency: string = '';

  constructor(private http: HttpClient) {}

  public getCurrencies(): Observable<any> {
    return this.http.get(URL).pipe(
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
