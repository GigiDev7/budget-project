import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StatisticsDataModel } from '../statistics.model';

const URL = 'http://localhost:5000/api/statistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  public data!: StatisticsDataModel;

  constructor(private http: HttpClient) {}

  public getStats(
    startDate: Date,
    endDate: Date,
    accountId: string
  ): Observable<any> {
    return this.http
      .post(`${URL}/${accountId}`, { startDate, endDate })
      .pipe(tap((res: any) => (this.data = res)));
  }
}
