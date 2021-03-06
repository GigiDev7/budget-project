import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from '../shared/models/account.model';
import { AccountService } from '../account-card/services/account.service';
import { StatisticsService } from './services/statistics.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReloadService } from '../reload/reload.service';

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  public activeClass: string = 'category';
  public dateForm: FormGroup = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
  public scrolltop!: number;

  constructor(
    public accountService: AccountService,
    public statisticsService: StatisticsService
  ) {}

  public handleScroll(event: Event): void {
    this.scrolltop = (event.target as any).scrollTop;
  }

  public onGenerateClick(): void {
    const { startDate, endDate } = this.dateForm.value;
    this.statisticsService
      .getStats(
        startDate,
        endDate,
        this.accountService.activeAccount._id,
        this.activeClass
      )
      .subscribe();
  }

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

  public ngOnDestroy(): void {
    this.statisticsService.categoryData = null;
    this.statisticsService.data = null;
  }
}
