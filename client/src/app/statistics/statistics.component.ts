import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../account-card/account.model';
import { AccountService } from '../account-card/services/account.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public activeClass: string = 'category';

  constructor(public accountService: AccountService) {}

  public onCategoryStatsClick(): void {
    this.activeClass = 'category';
  }

  public onMonthlyStatsClick(): void {
    this.activeClass = 'monthly';
  }

  public trackBy(index: number, item: AccountModel): string {
    return item._id;
  }

  public ngOnInit(): void {
    this.accountService.getAccounts().subscribe();
  }
}
