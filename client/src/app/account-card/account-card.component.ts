import { Component, Input, OnInit } from '@angular/core';
import { InfoCardService } from '../shared/info-card/services/info-card.service';
import { TransactionService } from '../transaction-card/services/transaction.service';
import { AccountModel } from '../shared/models/account.model';
import { AccountService } from './services/account.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StatisticsService } from '../statistics/services/statistics.service';

@UntilDestroy()
@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() public account!: AccountModel;

  public onCardClick(): void {
    this.accountService.activateAccount(this.account._id);
    this.accountService.setAccount(this.accountService.activeAccount);
    this.transactionService.getTransactions(this.account._id).subscribe({
      next: (data) => (this.transactionService.transactions = data),
    });
    this.statisticsService.data = null;
    this.statisticsService.categoryData = null;
  }

  public onViewAccountClick(): void {
    this.infoCardService.setType('Account');
    this.infoCardService.openInfoCard();
    this.accountService
      .getSingleAccount(this.account._id)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  constructor(
    public accountService: AccountService,
    public transactionService: TransactionService,
    public infoCardService: InfoCardService,
    private statisticsService: StatisticsService
  ) {}

  public ngOnInit(): void {
    let existingAccount = JSON.parse(localStorage.getItem('account')!);
    if (existingAccount) {
      this.accountService.activateAccount(existingAccount._id);
    } else {
      const firstAccount = this.accountService.accounts[0];
      this.accountService.activateAccount(firstAccount._id);
    }
  }
}
