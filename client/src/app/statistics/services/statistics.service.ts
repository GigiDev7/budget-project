import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  StatisticsDataModel,
  CategoryStatsModel,
} from '../../shared/models/statistics.model';
import { URL } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  public data: StatisticsDataModel | null = null;
  public categoryData: CategoryStatsModel | null = null;

  constructor(private http: HttpClient) {}

  public getStats(
    startDate: Date,
    endDate: Date,
    accountId: string,
    type: string
  ): Observable<any> {
    return this.http
      .post(`${URL}/statistics/${accountId}?type=${type}`, {
        startDate,
        endDate,
      })
      .pipe(
        tap((res: any) => {
          if (type === 'monthly') {
            this.data = res;
          } else {
            this.categoryData = res;
          }
        })
      );
  }
}
